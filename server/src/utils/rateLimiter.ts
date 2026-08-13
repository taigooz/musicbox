type QueuedFn<T> = () => Promise<T>;

export class RateLimiter {
    private queue: Array<() => Promise<void>> = [];
    private lastRun = 0;
    private processing = false;

    constructor(private minIntervalMs: number) {}

    schedule<T>(fn: QueuedFn<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    resolve(await fn());
                } catch (err) {
                    reject(err);
                }
            });
            this.process();
        });
    }

    private async process() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length > 0) {
            const wait = Math.max(0, this.minIntervalMs - (Date.now() - this.lastRun));
            if (wait > 0) await new Promise((r) => setTimeout(r, wait));

            const task = this.queue.shift();
            this.lastRun = Date.now();
            if (task) await task();
        }

        this.processing = false;
    }
}
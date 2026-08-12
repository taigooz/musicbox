import type { Request, Response } from "express";
import { getUser } from "../services/userService.js";

export function getProfileController(
    req: Request,
    res: Response
) {
    try {
        const user = getUser();

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}
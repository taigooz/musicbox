import type { Request, Response } from "express";
import { deleteAlbumRating, deleteAlbumReview, deleteAlbumUserData, getAlbumUserData, getLibrary, markAlbumAsListened, rateAlbum, reviewAlbum } from "../services/userAlbumService.js";

export function markAlbumAsListenedController(
    req: Request,
    res: Response
) {
    try {
        const id = `alb_${req.params.id}`;

        markAlbumAsListened(id);

        res.status(200).json({
            message: "Album marked as listened"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function rateAlbumController(
    req: Request,
    res: Response
) {
    try {
        const id = `alb_${req.params.id}`;
        const rating = req.body.rating;

        rateAlbum(id, rating);

        res.status(200).json({
            message: "Album rated"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function reviewAlbumController(
    req: Request,
    res: Response
) {
    try {
        const id = `alb_${req.params.id}`
        const review = req.body.review

        reviewAlbum(id, review)

        res.status(200).json({
            message: "Album reviewed"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function getAlbumUserDataController(
    req: Request,
    res: Response
) {
    try {
        const id = `alb_${req.params.id}`;

        const userData = getAlbumUserData(id);

        res.json(userData);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function getLibraryController(
    req: Request,
    res: Response
) {
    try {
        const library = getLibrary();

        res.json(library);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function deleteAlbumRatingController(
    req: Request,
    res: Response
) {
    try {
        const id = `alb_${req.params.id}`;

        deleteAlbumRating(id);

        res.status(200).json({
            message: "Rating removed"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function deleteAlbumReviewController(
    req: Request,
    res: Response
) {
    try {
        const id = `alb_${req.params.id}`;

        deleteAlbumReview(id);

        res.status(200).json({
            message: "Review removed"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}

export function deleteAlbumUserDataController(
    req: Request,
    res: Response
) {
    try {
        const id = `alb_${req.params.id}`;

        deleteAlbumUserData(id);

        res.status(200).json({
            message: "Album removed from library"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
}
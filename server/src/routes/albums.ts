import { Router } from "express";
import { searchAlbums } from "../services/appleMusic.js";

const router = Router();


router.get("/search", async (req, res) => {
    try {
        const term = req.query.term as string;

        if (!term) {
            return res.status(400).json({
                message: "Missing search term"
            });
        }

        const albums = await searchAlbums(term);

        res.json(albums);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


export default router;
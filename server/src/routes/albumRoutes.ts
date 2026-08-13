import { Router } from "express";
import {
    searchAlbumsController,
    getExternalAlbumController,
} from "../controllers/albumController.js";
import { getAlbumById } from "../services/albumService.js";
import {
    deleteAlbumUserDataController,
    getAlbumUserDataController,
    getLibraryController,
    markAlbumAsListenedController,
    rateAlbumController,
    reviewAlbumController,
    deleteAlbumRatingController,
    deleteAlbumReviewController,
} from "../controllers/userAlbumController.js";

const router = Router();


router.get("/search", searchAlbumsController);
router.get("/library", getLibraryController);
router.get("/external/:source/:externalId", getExternalAlbumController);

router.get("/:id", (req, res) => {
    const id = `alb_${req.params.id}`;
    const album = getAlbumById(id);
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json(album);
});

router.post("/:id/listened", markAlbumAsListenedController);
router.post("/:id/rating", rateAlbumController);
router.post("/:id/review", reviewAlbumController);
router.get("/:id/user-data", getAlbumUserDataController);
router.delete("/:id/user-data", deleteAlbumUserDataController);
router.delete("/:id/rating", deleteAlbumRatingController);
router.delete("/:id/review", deleteAlbumReviewController);

export default router;
import { Router } from "express";
import { searchAlbums } from "../services/appleMusicService.js";
import { searchAlbumsController } from "../controllers/albumController.js";

const router = Router();


router.get("/search", searchAlbumsController);


export default router;
import { Router } from "express";
import { searchAlbumsController } from "../controllers/albumController.js";
import { createAlbumController } from "../controllers/albumController.js";

const router = Router();


router.get("/search", searchAlbumsController);
router.post("/", createAlbumController);



export default router;
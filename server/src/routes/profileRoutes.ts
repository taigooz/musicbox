import { Router } from "express";
import { getProfileController } from "../controllers/profileController.js"

const router = Router();

router.get("/", getProfileController);

export default router;
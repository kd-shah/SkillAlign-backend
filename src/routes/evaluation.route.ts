import evaluationController from "../controllers/evaluation.controller.js";
import multer from "multer";  
import express from "express";

const upload = multer();
const router = express.Router();

router.post("/evaluate", upload.single("file"), evaluationController.evaluate);

export default router;

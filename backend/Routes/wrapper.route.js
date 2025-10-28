import express from "express";
import { wrap } from "../Controllers/wrapper.controller.js";

const router = express.Router();

router.post("/wrap", wrap);

export default router;

import { Router } from "express";
import { getChapters, getChapter, createChapter, updateChapter, deleteChapter } from "../controllers/chapter.controller.js";

const router=Router();

router.route("/allchapters").get(getChapters)
router.route("/chapter/:id").get(getChapter)
router.route("/chapter").post(createChapter)
router.route("/chapter/:id").patch(updateChapter)
router.route("/chapter/:id").delete(deleteChapter)

export default router
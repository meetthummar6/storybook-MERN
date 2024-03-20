import { Router } from "express";
import { getCommentsByChapter, CreateComment, deleteComment } from "../controllers/comment.controller.js";

const router=Router();

router.route("/chapter/:id").get(getCommentsByChapter)
router.route("/comment").post(CreateComment)
router.route("/comment/:id").delete(deleteComment)

export default router
import { Router } from "express";
import { getVote, CreateVote } from "../controllers/vote.controller.js";

const router=Router();

router.route("/vote/:id").get(getVote)
router.route("/vote").post(CreateVote)

export default router

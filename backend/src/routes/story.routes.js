import { Router } from "express";
import { getStories, getStory, createStory, updateStory, deleteStory,getUserStories } from "../controllers/story.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router=Router();

router.route("/allstories").get(getStories)
router.route("/story/:id").get(getStory)
router.route("/user/:id").get(getUserStories)
router.route("/story").post(upload.single("coverImage"),createStory)
router.route("/story/:id").patch(upload.single("coverImage"),updateStory)
router.route("/story/:id").delete(deleteStory)

export default router
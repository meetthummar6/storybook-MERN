import { Router} from "express";
import { getRating, CreateRating } from "../controllers/rating.controller.js";

const router=Router();

router.route("/rating/:id").get(getRating)
router.route("/rating").post(CreateRating)

export default router
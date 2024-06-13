import express from "express";
import { MovieControllers } from "./movie.controller";
import { ReviewControllers } from "../reviews/review.controller";
import { MovieValidation } from "./movie.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-movie",
  validateRequest(MovieValidation.createMovieZodSchema),
  MovieControllers.createMovie
);
router.get("/", MovieControllers.getAllMovies);
router.get("/:id", MovieControllers.getSingleMovie);
router.get("/:slug", MovieControllers.getMovieBySlug);
router.post("/:slug/review", ReviewControllers.addReview);
// router.get("/:slug/reviews", ReviewControllers.getAllReviews);
// router.put("/:slug/review", ReviewControllers.getReviewById);
// router.delete("/:slug/review", ReviewControllers.deleteReview);

export const MovieRoutes = router;

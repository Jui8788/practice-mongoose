import express from "express";
import { MovieControllers } from "./movie.controller";

const router = express.Router();

router.post("/", MovieControllers.createMovie);
router.get("/", MovieControllers.getAllMovies);
router.get("/:slug", MovieControllers.getMovieBySlug);

export const MovieRoutes = router;

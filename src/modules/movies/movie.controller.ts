import { Request, Response } from "express";
import { MovieServices } from "./movie.service";

const createMovie = async (req: Request, res: Response) => {
  try {
    const movieData = req.body;
    const result = await MovieServices.createMovieIntoDB(movieData);
    res.status(200).json({
      success: true,
      message: "Movie is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await MovieServices.getAllMoviesFromDB;
    res.status(200).json({
      success: true,
      message: "Movies are fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not fetch movies properly",
      error: error,
    });
  }
};

const getMovieBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await MovieServices.getMovieBySlugFromDB(slug);

    res.status(200).json({
      success: true,
      message: "Movie is fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not fetch movie properly",
      error: error,
    });
  }
};

export const MovieControllers = {
  createMovie,
  getAllMovies,
  getMovieBySlug,
};

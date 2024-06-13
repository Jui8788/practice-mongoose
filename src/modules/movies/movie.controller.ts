import { MovieServices } from "./movie.service";
import { catchAsync } from "../../utils/catchAsync";

const createMovie = catchAsync(async (req, res, next) => {
  const movieData = req.body;
  const result = await MovieServices.createMovieIntoDB(movieData);

  res.json({
    success: true,
    message: "Movie is created successfully !",
    data: result,
  });
});

const getAllMovies = catchAsync(async (req, res, next) => {
  const result = await MovieServices.getAllMoviesFromDB();

  res.status(200).json({
    success: true,
    message: "Movies are fetched successfully !",
    data: result,
  });
});

const getSingleMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await MovieServices.getSingleMovieFromDB(id);

  res.status(200).json({
    success: true,
    message: "Movie fetched successfully !",
    data: result,
  });
});

const getMovieBySlug = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const result = await MovieServices.getMovieBySlugFromDB(slug);

  res.status(200).json({
    success: true,
    message: "Movies are fetched successfully !",
    data: result,
  });
});

export const MovieControllers = {
  createMovie,
  getAllMovies,
  getMovieBySlug,
  getSingleMovie,
};

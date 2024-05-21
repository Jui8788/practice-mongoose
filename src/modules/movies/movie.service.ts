import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";

const createMovieIntoDB = async (payload: TMovie) => {
  // formatting date
  // const date = format(payload.releaseDate, "dd-MM-yyyy");

  // creating slug
  // const slug = slugify(`${payload.title}-${date}`, { lower: true });

  // const result = await Movie.create({ ...payload, slug });

  const result = new Movie(payload);
  const slug = result.createSlug(payload);
  result.slug = slug;

  // database save
  await result.save();
  return result;
};

const getAllMoviesFromDB = async () => {
  const result = await Movie.find();
  return result;
};

const getMovieBySlugFromDB = async (slug: string) => {
  const result = await Movie.findOne({ slug: slug });
  return result;
};

export const MovieServices = {
  createMovieIntoDB,
  getAllMoviesFromDB,
  getMovieBySlugFromDB,
};

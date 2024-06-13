import { QueryBuilder } from "../../builder/QueryBuilder";
import { MovieSearchableFields } from "./movie.constant";
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

const getAllMoviesFromDB = async (payload: Record<string, unknown>) => {
  // searching---> Partially match
  // let searchTerm = "";

  // if (payload?.searchTerm) {
  //   searchTerm = payload?.searchTerm as string;
  // }

  // const searchAbleFields = ["title", "genre"];
  // // {title:{$regex: searchTerm}}
  // // {genre:{$regex: searchTerm}}

  // const searchedMovies = Movie.find({
  //   $or: searchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // // pagination
  // // 1st skip = 0
  // // 2nd skip = 2*10 - 1*10
  // // 3rd skip = 3*10 - 2*10
  // // skip = (page-1)*limit

  // let limit: number = Number(payload?.limit || 10);
  // let skip: number = 0;

  // if (payload?.page) {
  //   const page: number = Number(payload?.page || 1);
  //   skip = Number((page - 1) * limit);
  // }

  // const skippedQuery = searchedMovies.skip(skip);

  // const limitQuery = skippedQuery.limit(limit);

  // // sorting
  // let sortBy = "releaseDate";

  // if (payload?.sortBy) {
  //   sortBy = payload.sortBy as string;
  // }

  // const sortQuery = limitQuery.sort(sortBy);

  // // field filtering
  // // {fields: a,b,c}

  // let fields = " ";
  // if (payload.fields) {
  //   fields = (payload?.fields as string).split(",").join(" ");
  // }
  // const fieldQuery = sortQuery.select(fields);

  // // copied from payload object
  // //Filtering - Exact Match - title = "Inception"
  // const queryObj = { ...payload };

  // const excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"];
  // excludeFields.forEach((elem) => delete queryObj[elem]);

  // const result = await fieldQuery.find(queryObj);
  // return result;

  const movieQuery = new QueryBuilder(Movie.find({}), payload)
    .filter()
    .search(MovieSearchableFields)
    .fields()
    .paginate()
    .sort();

  const result = await movieQuery.modelQuery;
  return result;
};

const getSingleMovieFromDB = async (id: string) => {
  const movie = await Movie.findOne({ _id: id });
  return movie;
};

const getMovieBySlugFromDB = async (slug: string) => {
  const result = await Movie.findOne({ slug: slug });
  return result;
};

export const MovieServices = {
  createMovieIntoDB,
  getAllMoviesFromDB,
  getSingleMovieFromDB,
  getMovieBySlugFromDB,
};

import { Schema, model } from "mongoose";
import { TMovie, TMovieMethods, TMovieModel, TReview } from "./movie.interface";
import { format } from "date-fns";
import slugify from "slugify";

const reviewSchema = new Schema<TReview, TMovieModel, TMovieMethods>({
  email: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },
});

const movieSchema = new Schema<TMovie>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  releaseDate: {
    type: Date,
  },

  genre: {
    type: String,
    required: [true, "Genre is required"],
  },

  reviews: {
    type: [reviewSchema],
  },

  slug: {
    type: String,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  viewCount: {
    type: Number,
    default: 0,
  },
});

// const movieSchema = new Schema<TMovie>({
//   title: {
//     type: String,
//     required: [true, "Title is required"],
//   },

//   description: {
//     type: String,
//     required: [true, "Description is required"],
//   },

//   releaseDate: {
//     type: Date,
//   },

//   genre: {
//     type: String,
//     required: [true, "Genre is required"],
//   },

//   reviews: {
//     type: [reviewSchema],
//   },

//   slug: {
//     type: String,
//   },

//   isDeleted: {
//     type: Boolean,
//     default: false,
//   },

//   viewCount: {
//     type: Number,
//     default: 0,
//   },
// });

// movieSchema.pre("save", async function (next) {
//   // formatting date
//   const date = format(this.releaseDate, "dd-MM-yyyy");

//   // creating slug
//   this.slug = slugify(`${this.title}-${date}`, { lower: true });

//   next;
// });

// export const Movie = model<TMovie>("Movie", movieSchema);

movieSchema.method("createSlug", function createSlug(payload: TMovie) {
  //formatting date
  const date = format(payload.releaseDate, "dd-MM-yyyy");

  // creating slug
  const slug = slugify(`${payload.title}-${date}`, { lower: true });

  return slug;
});

export const Movie = model<TMovie, TMovieModel>("Movie", movieSchema);

import { Model } from "mongoose";

export type TReview = {
  email: string;
  rating: number;
  comment: string;
};

export type TMovie = {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  reviews: [TReview];
  slug: string;
  viewCount: number;
  isDeleted?: boolean;
};

// --->Instance Method <----
// Put all user instance methods in this interface:
export type TMovieMethods = {
  createSlug(payload: TMovie): string;
};

// Create a new Model type that knows about MovieMethods...
export type TMovieModel = Model<TMovie, Record<string, unknown>, TMovieMethods>;

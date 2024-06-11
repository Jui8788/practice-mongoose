import { Movie } from "../movies/movie.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const addReviewIntoDB = async (
  slug: string,
  reviewData: Partial<TReview>
): Promise<TReview> => {
  const movie = await Movie.findOne({ slug });

  if (!movie) {
    throw new Error("Movie not found");
  }

  const session = await Movie.startSession();
  try {
    session.startTransaction();

    const review = await Review.create([{ movie: movie._id, ...reviewData }], {
      session,
    });
    const reviews = await Review.countDocuments({ movie: movie._id }).session(
      session
    );

    await Movie.updateOne({ slug }, { totalRating: reviews }, { session });

    await session.commitTransaction();
    return review[0];
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  }

  session.endSession();
};

const getAllReviewsFromDB = () => {};
const getReviewByIdFromDB = () => {};
const updateReviewBySlugFromDB = () => {};
const deleteReviewBySlugFromDB = () => {};

export const ReviewServices = {
  addReviewIntoDB,
  getAllReviewsFromDB,
  getReviewByIdFromDB,
  updateReviewBySlugFromDB,
  deleteReviewBySlugFromDB,
};

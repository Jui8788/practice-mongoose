import { Request, Response } from "express";
import { ReviewServices } from "./review.service";

const addReview = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const reviewData = req.body;
    const result = await ReviewServices.addReviewIntoDB(slug, reviewData);

    res.status(200).json({
      success: true,
      message: "Review is created successfully",
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

// const getAllReviews = async (req: Request, res: Response) => {
//   try {
//     const result = await ReviewServices.getAllReviewsFromDB;
//     res.status(200).json({
//       success: true,
//       message: "Reviews are fetched successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch reviews properly",
//       error: error,
//     });
//   }
// };

// const getReviewById = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.getReviewByIdFromDB(slug);

//     res.status(200).json({
//       success: true,
//       message: "Review is fetched successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch review properly",
//       error: error,
//     });
//   }
// };

// const updateReview = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.updateReviewBySlugFromDB(slug);

//     res.status(200).json({
//       success: true,
//       message: "Review is fetched successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch review properly",
//       error: error,
//     });
//   }
// };

// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.deleteReviewBySlugFromDB(slug);

//     res.status(200).json({
//       success: true,
//       message: "Review is fetched successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch review properly",
//       error: error,
//     });
//   }
// };

export const ReviewControllers = {
  addReview,
  //   getAllReviews,
  //   getReviewById,
  //   updateReview,
  //   deleteReview,
};

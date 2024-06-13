import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error.interface";
import { handleValidationError } from "../errors/handleValidationError";
import { handleCastError } from "../errors/handleCastError";
import { handleDuplicateError } from "../errors/handleDuplicateError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 400;
  let message = "Something Went Wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something Went Wrong",
    },
  ];

  if (err.name === "ValidationError") {
    const simplified = handleValidationError(err);
    errorSources = simplified?.errorSources;
  } else if (err.name === "CastError") {
    const simplified = handleCastError(err);
    errorSources = simplified?.errorSources;
  } else if (err.code === 11000) {
    const simplified = handleDuplicateError(err);
    errorSources = simplified?.errorSources;
  }

  return res.status(500).json({
    success: false,
    message,
    errorSources,
  });
};

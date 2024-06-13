import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error.interface";
import { handleValidationError } from "../errors/handleValidationError";
import { handleCastError } from "../errors/handleCastError";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import AppError from "../errors/AppError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
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
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};

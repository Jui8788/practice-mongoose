import mongoose from "mongoose";
import { TErrorSources } from "../interface/error.interface";

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    message: "Cast Error",
    errorSources,
  };
};

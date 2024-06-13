import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  // return async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // validation check
  //     // if everything alright, next->controller
  //     await schema.parseAsync({
  //       body: req.body,
  //     })

  //     next()
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    req.body = parsedBody.body;

    next();
  });
};

export default validateRequest;

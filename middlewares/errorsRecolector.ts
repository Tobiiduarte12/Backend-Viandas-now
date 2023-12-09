import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationError, Result } from "express-validator";

export const errorRecolector = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
  } else {
    next();
  }
};

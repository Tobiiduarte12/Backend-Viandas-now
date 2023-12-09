import { NextFunction, Request, Response } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) => {
  const { verificado } = req.body.userConfirmed;

  if (!verificado) {
    res.status(401).json({
      msg: "El usuario no ha sido verificado",
    });
    return;
  }

  next();
};

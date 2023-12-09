import { NextFunction, Request, Response } from "express";
import { ROLES } from "../helpers/constans";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { rol } = req.body.userConfirmed;

  if (rol !== ROLES.admin) {
    res.status(404).json({
      msg: "No tienes permisos para realizar esta acción",
    });
    return;
  }

  next();
};

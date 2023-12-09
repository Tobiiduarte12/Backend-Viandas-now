import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Usuario, { IUsuario } from "../models/usuario";

const validationJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-token"] as string;

  if (!token) {
    res.status(401).json({
      msg: "No hay token en la petición",
    });
    return;
  }

  try {
    const claveSecreta = process.env.CLAVESECRETA as string;

    const payload = jwt.verify(token, claveSecreta) as jwt.JwtPayload;

    const { id } = payload;

    const userConfirmed: IUsuario | null = await Usuario.findById(id);

    if (!userConfirmed) {
      res.status(404).json({
        msg: "El usuario no fue encontrado en la base de datos",
      });
      return;
    }

    req.body.userConfirmed = userConfirmed;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export default validationJWT;

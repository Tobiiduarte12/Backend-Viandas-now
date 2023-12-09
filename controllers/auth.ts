import { Request, Response } from "express";
import Usuario, { IUsuario } from "../models/usuario";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constans";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { generarJWT } from "../helpers/generarJWT";

export const register = async (req: Request, res: Response) => {
  const { nombre, email, password, rol }: IUsuario = req.body;

  const usuario = new Usuario({ nombre, email, password, rol });

  const salt = bcryptjs.genSaltSync();

  usuario.password = bcryptjs.hashSync(password, salt);

  const adminKEY = req.headers["admin-key"];

  if (adminKEY === process.env.KEYFORADMIN) {
    usuario.rol = ROLES.admin;
  }

  const newCode = randomstring.generate(7);

  usuario.code = newCode;

  await usuario.save();

  await sendEmail(email, newCode);

  res.status(201).json({
    usuario,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUsuario = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      res.status(404).json({
        msg: "El usuario no se encontró en la base de datos",
      });
      return;
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      res.status(401).json({
        msg: "La contraseña es incorrecta",
      });
      return;
    }

    const token = await generarJWT(usuario.id);

    res.status(202).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor, te pido mildis",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      res.status(404).json({
        msg: "El usuario no se encontró en la base de datos",
      });
      return;
    }

    if (usuario.verificado) {
      res.status(400).json({
        msg: "El usuario ya está verificado",
      });
      return;
    }

    if (code !== usuario.code) {
      res.status(401).json({
        msg: "El código ingresado es incorrecto",
      });
      return;
    }

    await Usuario.findOneAndUpdate({ email }, { verificado: true });

    res.status(200).json({
      msg: "El usuario se verificó correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor, te pido mildis",
    });
  }
};

import { sendEmail } from "../mailer/mailer";
import Usuario, { IUsuario } from "../models/usuario";

export const emailExisting = async (email: string): Promise<void> => {
  const existeEmail: IUsuario | null = await Usuario.findOne({ email });

  if (existeEmail && existeEmail.verificado) {
    throw new Error(`El email ${email} ya existe`);
  }

  if (existeEmail && !existeEmail.verificado) {
    await sendEmail(email, existeEmail.code as string);
    throw new Error(
      `El email ya esta verificado, se reenvió el codigo de verificacion a ${email}`
    );
  }
};

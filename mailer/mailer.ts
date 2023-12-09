import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tobiiduarte95@gmail.com",
    pass: "khbyvyzplylfizqp",
  },
  from: "Tobias Duarte",
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
  const mailOptions = {
    from: '"Tobias Duarte" tobiiduarte95@gmail.com',
    to,
    subject: "Codigo de verificacion",
    text: `
        Este es tú código de verificacion: ${code},
        Ingresá este codigo en la aplicacion para verificar tu cuenta
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo electronico enviado");
  } catch (error) {
    console.error("Error al enviar el correo electronico", error);
  }
};

import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `A&E Boutique`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Asunto: ${subject}
        Mensaje:
        ${message}
      `,
    });

    res.status(200).send("Mensaje enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Error al enviar el mensaje");
  }
};

import nodemailer from "nodemailer";
import express from "express"
const router = express.Router();



//Email Configuration
const transporter = nodemailer.createTransport({
    service: "gmail", // Puedes usar "outlook", "sendgrid", etc.
    auth: {
      user: "stak89544@gmail.com", // Tu correo electrónico
      pass: "pwvm stag aqsu gttr", // Tu contraseña o contraseña de aplicación
    },
  });


// Endpoint para enviar correo
router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
  
    const mailOptions = {
      from: "stak89544@gmail.com", // Correo del remitente
      to, // Correo del destinatario
      subject, // Asunto del correo
      text, // Cuerpo del correo (texto plano)
      html: `<p>${text}</p>`, // Cuerpo del correo en HTML (opcional)
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Correo enviado con éxito" });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      res.status(500).json({ success: false, message: "Error al enviar el correo" });
    }
  });
  

  export default router;
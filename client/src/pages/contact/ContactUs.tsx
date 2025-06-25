import { useState } from "react";
import axios from "axios";
import "./contactUs.scss";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, formData);
      setStatus("Mensaje enviado con éxito.");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setStatus("Error al enviar el mensaje.");
    }
  };

  return (
    <section className="contact-us-container">
  <h2 className="contact-title">Contáctanos</h2>

  <div className="contact-us-content">
    <form className="contact-us-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          id="name"
          placeholder="Nombre completo"
          autoComplete="name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          id="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          id="subject"
          placeholder="Asunto"
          onChange={handleChange}
          value={formData.subject}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          id="message"
          placeholder="Tu mensaje"
          rows={3}
          style={{ resize: "none" }}
          onChange={handleChange}
          value={formData.message}
          required
        />
      </div>

      <button type="submit" className="submit-button" aria-label="Submit">
        Enviar mensaje
      </button>

      {status && <p className="status-message">{status}</p>}
    </form>
  </div>
</section>

  );
}

export default ContactUs;


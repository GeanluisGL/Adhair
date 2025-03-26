import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  // Función para manejar el envío del correo de recuperación
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email); // Envía el correo de recuperación
      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: "Se ha enviado un correo para restablecer tu contraseña.",
      });
      navigate("/login"); // Redirige al usuario al inicio de sesión
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar el correo. Verifica tu dirección de correo electrónico.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Recuperar Contraseña</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Correo"}
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            ¿Recordaste tu contraseña?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Iniciar Sesión
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
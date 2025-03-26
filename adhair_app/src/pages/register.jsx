import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { show_alert } from '../functions';
import { setDoc, doc, getDoc } from "firebase/firestore";
import Returnbtn from "../components/returnbtn";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [Lname, setLName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Estado para el rol del usuario
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario actual
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Verificar el rol del usuario al cargar la página
    const checkUserRole = async () => {
      const user = auth.currentUser; // Obtener el usuario actual

      if (user) {
        // Obtener el documento del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "Users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role); // Establecer el rol del usuario

          // Si el usuario no es admin, redirigir
          if (userData.role !== "admin") {
            show_alert("No tienes permisos para acceder a esta página.", "warning");
            navigate("/"); // Redirigir a la página de inicio
          }
        } else {
          show_alert("Usuario no encontrado en la base de datos.", "error");
          navigate("/"); // Redirigir a la página de inicio
        }
      } else {
        show_alert("Debes iniciar sesión para acceder a esta página.", "warning");
        navigate("/login"); // Redirigir a la página de login
      }

      setLoading(false); // Finalizar la carga
    };

    checkUserRole();
  }, [navigate]);

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Correo de verificación enviado.");
      show_alert('Se ha enviado un correo de verificación a tu dirección de correo electrónico.', 'success');
    } catch (error) {
      console.error("Error al enviar el correo:", error.message);
      show_alert('Error al enviar el correo de verificación.', 'error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Registra al usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualiza el perfil con el nombre
      await updateProfile(user, { displayName: name });

      // Guarda en Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: email,
          name: name,
          Lname: Lname,
          verified: false, // Inicialmente no verificado
          role: role, // Usa el rol seleccionado
        });
      }

      console.log("Usuario registrado exitosamente:", user);

      // Envía el correo de verificación
      await sendVerificationEmail(user);

      // Redirige al usuario
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      show_alert('Error al registrar el usuario. Por favor, intenta nuevamente.', 'error');
    }
  };

  // Si está cargando, mostrar un spinner o mensaje de carga
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si el usuario no es admin, no mostrar el contenido
  if (userRole !== "admin") {
    return null; // O puedes redirigir aquí también
  }

  // Contenido de la página para administradores
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Bienvenida Adhara</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">Apellidos</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              value={Lname}
              onChange={(e) => setLName(e.target.value)}
              placeholder="Ingrese su apellido"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Rol</label>
            <select
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Registrarse
          </button>
        </form>
        <div className="text-center mt-3">
          <Returnbtn />
        </div>
      </div>
    </div>
  );
};

export default Register;
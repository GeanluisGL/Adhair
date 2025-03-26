import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import ANavbar from "../components/ANavbar";

const AdminConfiguration = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // Estado para verificar el rol del usuario

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin" ) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          navigate("/"); // Redirigir a la página principal si no es admin
        }
      } else {
        navigate("/"); // Si no hay usuario, redirigir
      }
    };

    checkAdmin();
  }, [navigate]);

  if (isAdmin === null) {
    return <div>Cargando...</div>; // Mientras se verifica el rol
  }

  return (
    <div className="container mt-5">
      <h2>Panel de Configuración</h2>
      <ANavbar/>
    </div>
  );
};

export default AdminConfiguration;

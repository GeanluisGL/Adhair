import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,  } from '../firebase/firebase';
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { show_alert } from "../functions";
import Returnbtn from "../components/returnbtn";
import  "../components/Style/Login.css";

const LoginPage = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User loged in Successfully")
      show_alert('Welcome', 'success')
      window.location.href="/Crudam";
      
    } catch (error) {
      show_alert('Email o contraseña invalido, por favor revisar si valido correo', 'error')
      
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
       
     {/* Botón Returnbtn flotando a la izquierda */}
     <div className="return-btn-container">
        <Returnbtn />
      </div>


      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">BIENVENIDA</h3> 
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
             Correo Electronico
            </label>
            <input type="email" className="form-control" id="email" placeholder="Ingresa el email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa la contraseña" required/>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
         ¿Olvidaste la contraseña
      <span
        onClick={() => navigate("/forgot-Password")}
        style={{ color: "blue", cursor: "pointer" }}
      >
        ? Recuperar 
      </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

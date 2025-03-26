import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { collection, getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import ANavbar from "./ANavbar";
import Swal from "sweetalert2";
import EditUserModal from "./EditUserModal";

const User_Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es superadmin
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para obtener los usuarios desde Firestore
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "Users"); // Cambia "Users" por el nombre de tu colección
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList); // Actualiza el estado con los usuarios
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    fetchUsers(); // Llama a la función al montar el componente
  }, []);

  // Verificar si el usuario actual es superadmin
  useEffect(() => {
    const checkSuperAdmin = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true); // El usuario es superadmin
        } else {
          setIsAdmin(false); // El usuario no es superadmin
          navigate("/"); // Redirigir a la página principal si no es superadmin
        }
      } else {
        navigate("/"); // Si no hay usuario, redirigir
      }
    };

    checkSuperAdmin();
  }, [navigate]);

  const reauthenticateUser = async (password) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("No hay usuario autenticado o el usuario no tiene correo electrónico.");
    }

    // Crear la credencial con el correo y la contraseña
    const credential = EmailAuthProvider.credential(user.email, password);

    // Reautenticar al usuario
    await reauthenticateWithCredential(user, credential);
  };

  const handleDeleteUser = async (userId) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No hay usuario autenticado.");
      return;
    }

    try {
      // Obtener el rol del usuario actual desde Firestore
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (!userDoc.exists()) {
        console.error("Usuario no encontrado en Firestore.");
        return;
      }

      const userRole = userDoc.data().role; // Obtener el rol del usuario

      if (userRole === "admin") {
        // Pedir al usuario que ingrese su contraseña para reautenticarse
        const { value: password } = await Swal.fire({
          title: "Reautenticación requerida",
          input: "password",
          inputLabel: "Ingresa tu contraseña para continuar",
          inputPlaceholder: "Contraseña",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
          },
        });

        if (!password) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Debes ingresar tu contraseña para eliminar este usuario.",
          });
          return;
        }

        // Reautenticar al usuario
        await reauthenticateUser(password);

        // Eliminar el usuario de Firestore
        await deleteDoc(doc(db, "Users", userId));

        // Actualizar la lista de usuarios
        setUsers(users.filter((user) => user.id !== userId));

        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          text: "El usuario ha sido eliminado correctamente.",
        });

        // Recargar la página para reflejar los cambios
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No tienes permisos para eliminar este usuario.",
        });
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo eliminar el usuario.",
      });
    }
  };

  const handleEditUser = async (userId, newData) => {
    if (!isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No tienes permisos para editar usuarios.",
      });
      return;
    }

    try {
      // Actualizar el registro del usuario en Firestore
      await updateDoc(doc(db, "Users", userId), newData);

      // Actualizar la lista de usuarios
      setUsers(users.map((user) => (user.id === userId ? { ...user, ...newData } : user)));

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "El usuario ha sido actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el usuario.",
      });
    }
  };

  // Función para abrir el modal con los datos del usuario
  const handleEditClick = (user) => {
    if (!isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No tienes permisos para editar usuarios.",
      });
    } else {
      setSelectedUser(user); // Guarda el usuario seleccionado
      setShowModal(true); // Abre el modal
    }
  };

  // Función para guardar los cambios
  const handleSaveUser = (updatedData) => {
    if (selectedUser) {
      handleEditUser(selectedUser.id, updatedData); // Llama a la función para editar el usuario
    }
  };

  if (loading) {
    return <p>Cargando usuarios...</p>; // Muestra un mensaje de carga
  }

  return (
    <div className="container mt-5">
      <h1>Administración de Usuarios</h1>
      <ANavbar /> <br />
      <button
        className="buton_A btn btn-dark d-flex align-items-center"
        onClick={() => navigate("/SignUp")}
      >
        <i className="fa-solid fa-circle-plus me-2"></i> Registrar usuario
      </button>

      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              {isAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {isAdmin && (
                  <td>
                     <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios registrados.</p>
      )}

      <EditUserModal
        show={showModal}
        onHide={() => setShowModal(false)} // Cierra el modal
        user={selectedUser || { name: "", role: "" }} // Pasa los datos del usuario seleccionado
        onSave={handleSaveUser} // Función para guardar los cambios
      />
    </div>
  );
};

export default User_Admin;
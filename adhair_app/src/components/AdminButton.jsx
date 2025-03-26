import React from "react";
import { useNavigate } from "react-router-dom";
import useUserRole from "./useUserRole";

const AdminButton = () => {
  const role = useUserRole();
  const navigate = useNavigate();

  return (
    <>
      {(role === "admin" || role==="superadmin") && (
        <button className="btn btn-warning fw-bold" onClick={() => navigate("/admin/configuracion")}>
         <i class="fa-solid fa-gear"></i>
        </button>
      )}
    </>
  );
};

export default AdminButton;

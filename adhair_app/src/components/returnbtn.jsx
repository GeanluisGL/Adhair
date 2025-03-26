import { useNavigate } from "react-router-dom";

const ReturnBtn = () => {
  const navigate = useNavigate();

  return (
    <button 
      className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 px-2 py-1"
      onClick={() => navigate(-1)}>
      <i class="fa-solid fa-arrow-left"></i> Regresar
    </button>
  );
};

export default ReturnBtn;

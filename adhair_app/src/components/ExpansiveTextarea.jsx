import { FaInfoCircle, FaAlignCenter } from "react-icons/fa"; // Ícono de FontAwesome
import React, { useRef } from "react";

const ExpansiveTextarea = ({ value, onChange = () => {}, placeholder })  => {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
      <span className="input-group-text bg-white border-end-0">
              <FaAlignCenter className="text-primary" />
            </span>
      <textarea
        ref={textareaRef}
        value={value} // Asigna el valor desde las props
      onInput={(e) => {
        handleInput(); // Ajusta la altura
        onChange(e); // Actualiza el estado en el componente padre
      }}
        rows={1}
        placeholder="Descripción"
        style={{
          width: "25em",
          overflow: "hidden",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default ExpansiveTextarea;
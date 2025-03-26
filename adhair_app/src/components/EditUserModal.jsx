import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { show_alert } from "../functions";

const EditUserModal = ({ show, onHide, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    if(name !== " "){

      onSave({ name, role }); // Envía los nuevos datos al componente padre
      onHide(); // Cierra el modal
    }else{
      show_alert('Por favor escribe o confirma el nombre y el rol','warning')
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddReserva = () => {
  const [formData, setFormData] = useState({
    instalacion: "",
    fecha: "",
    hora: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/mis-reservas/add", formData);
      alert("Reserva agregada correctamente");
      navigate("/mis-reservas"); // Redirige a la lista de reservas
    } catch (err) {
      console.error("Error al agregar la reserva:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Instalación</Form.Label>
        <Form.Control
          type="text"
          value={formData.instalacion}
          onChange={(e) => setFormData({ ...formData, instalacion: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="date"
          value={formData.fecha}
          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hora</Form.Label>
        <Form.Control
          type="time"
          value={formData.hora}
          onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
        />
      </Form.Group>
      <Button type="submit" className="mt-3">
        Agregar Reserva
      </Button>
    </Form>
  );
};

export default AddReserva;
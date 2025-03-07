import { useEffect, useState } from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MisReservasList (){
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { 
        const peticion = async () => {
            try {
                const response = await api.get('/mis-reservas');
                setReservas(response.data);
            } catch (err) {
                setError('No se puede completar la operación');
                navigate('/login');
                console.error(err);
            }
        };
        peticion();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
            try {
                await api.delete(`/mis-reservas/del/${id}`);
                setReservas(reservas.filter(reserva => reserva.id !== id));
            } catch (err) {
                setError('No se pudo eliminar la reserva');
                console.error(err);
            }
        }
    };

    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Instalación</th> 
                        <th>Hora reserva</th>
                        <th>Fecha reserva</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.id}</td>
                            <td>{reserva.horario.instalacion.nombre}</td>
                            <td>{reserva.horario.horaInicio}</td>
                            <td>{reserva.fecha}</td>
                            <td>
                                <Button as={Link} to={`/mis-reservas/edit/${reserva.id}`} className="btn-success">
                                    Editar
                                </Button>
                            </td>                            
                            <td>
                                <Button onClick={() => handleDelete(reserva.id)} className="btn-danger">
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
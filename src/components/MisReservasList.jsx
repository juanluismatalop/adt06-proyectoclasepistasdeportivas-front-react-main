import { useEffect, useState } from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const MisReservasList = () => {
    const [reservas, setReservas] = useState([]);
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { 
        const peticionReservas = async () => {
            try {
                const response = await api.get('/mis-reservas');
                if (Array.isArray(response.data)) {
                    setReservas(response.data);
                } else {
                    setError('Las reservas no son un arreglo válido');
                }
            } catch (err) {
                setError('No se puede completar la operación');
                navigate('/login');
                console.error(err);
            }
        };
        peticionReservas();
    }, [navigate]);

    useEffect(() => {
        const peticionHorarios = async () => {
            try {
                const response = await api.get('/horarios');
                const disponibles = response.data.filter(horario => !horario.reservado);
                setHorariosDisponibles(disponibles);
            } catch (err) {
                setError('No se pudo cargar los horarios');
                console.log(err);
            }
        };
        peticionHorarios();
    }, []);

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
            <h3>Mis Reservas</h3>
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
                    {Array.isArray(reservas) && reservas.length > 0 ? (
                        reservas.map((reserva) => (
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No tienes reservas</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <h3>Horarios Disponibles</h3>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Instalación</th> 
                        <th>Hora</th>
                        <th>Fecha</th>
                        <th>Reservar</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(horariosDisponibles) && horariosDisponibles.length > 0 ? (
                        horariosDisponibles.map((horario) => (
                            <tr key={horario.id}>
                                <td>{horario.id}</td>
                                <td>{horario.instalacion}</td>
                                <td>{horario.horaInicio}</td>
                                <td>{horario.fecha}</td>
                                <td>
                                    <Button as={Link} to={`/reservar/${horario.id}`} className="btn-primary">
                                        Reservar
                                    </Button>
                                </td>                            
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay horarios disponibles</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default MisReservasList;
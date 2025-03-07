import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const MisReservasList = () => {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        const peticion = async () => {
            try {
                const response = await api.get('/mis-reservas');
                setReservas(response.data);
            } catch (err) {
                // setError('No se puede completar la operación');
                navigate('/login')
                console.log(err);
            }
        };
        peticion();
    }, []); // <-- Agrega el arreglo de dependencias vacío

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Instalacion</th> 
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
                                <Button as={Link} to={`/mis-reservas/del/${reserva.id}`} className="btn-danger">
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/*error && <p style={{ color: 'red' }}>{error}</p>*/}
        </Container>
    );
};

export default MisReservasList;
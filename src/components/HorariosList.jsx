import { useEffect, useState } from "react";
import {Button, Container, Table} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function HorariosList(){
    const [horarios, setHorarios] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function peticion(){
            try{
                const response = await api.get('/horarios')
                setHorarios(response.data);
            }catch(err){
                navigate('/login')
                console.log(err);
            }
        };
        peticion();
    },[]);

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Instalacion</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        horarios.map((horario) => (
                            <tr key={horario.id}>
                                <td>{horario.istalaciones}</td>
                                <td>{horario.horaInicio}</td>
                                <td>{horario.horaFin}</td>
                                <td><Button as={Link} to={`/horarios/edit/${horario.id}`}>Editar</Button></td>
                                <td><Button as={Link} to={`/horarios/del/${horario.id}`}>Eliminar</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}
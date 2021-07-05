import axios from 'axios';
import Alert from '../../alertService/AlertService';
import { API_BASE_URL } from './../../../app/config';

const defaultData = [
    {name: '1 Actividad de prueba', image:'https://via.placeholder.com/150', content: 'contenido de prueba' , deletedAt:1, id:1},
    {name: '2 Actividad de prueba', image:'https://via.placeholder.com/150', content: 'contenido de prueba' , deletedAt:0, id:2},
    {name: '3 Actividad de prueba', image:'https://via.placeholder.com/150', content: 'contenido de prueba' , deletedAt:1, id:3},
    {name: '4 Actividad de prueba', image:'https://via.placeholder.com/150', content: 'contenido de prueba' , deletedAt:1, id:4},
    {name: '5 Actividad de prueba', image:'https://via.placeholder.com/150', content: 'contenido de prueba' , deletedAt:0, id:5}
];

export const getActivities = async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(API_BASE_URL + '/activities', {
            'headers': {
                'Authorization': 'Bearer ' + JSON.parse(token)
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
        Alert.error("Error", "Hubo un problema al intentar obtener las actividades");
        return defaultData;
    }
}
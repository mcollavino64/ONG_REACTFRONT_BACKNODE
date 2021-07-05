import axios from 'axios'
import { API_BASE_URL } from '../../app/config';

export default async function getUserInfo() {

    try {
        const token = localStorage.getItem('org_token');
        const res = await axios.get(`${API_BASE_URL}/users/auth/me`, {
            'headers': {
                'Authorization': 'Bearer ' + JSON.parse(token),
            },
        });
        return res.data;
    } catch (err) {
        console.error(err);
        // AlertService.error("Error", "Hubo un problema al intentar obtener el listado")
    }
}
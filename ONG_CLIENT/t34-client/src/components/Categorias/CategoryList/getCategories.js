import axios from 'axios'
import { API_BASE_URL } from '../../app/config'
import AlertService from '../alertService/AlertService'

export const getCategories = async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(API_BASE_URL + '/categories', {
            'headers': {
                'Authorization': 'Bearer ' + JSON.parse(token)
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
        AlertService.error("Error", "Hubo un problema al intentar obtener las categorías")
    }
}
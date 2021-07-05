import axios from 'axios'
import { API_BASE_URL } from '../../app/config';

export default async function deleteUserAccount() {

    try {
        const userId = localStorage.getItem('userId');
        const res = await axios.delete(`${API_BASE_URL}/users/${userId}`)
        if (res.status !== 200) {
            return false;
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
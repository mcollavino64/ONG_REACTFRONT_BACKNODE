import axios from 'axios'
import { API_BASE_URL } from '../../app/config';

async function updateUserName(name, userData) {

    try {
        const userId = localStorage.getItem('userId');
        const res = await axios.put(`${API_BASE_URL}/users/${userId}`,
            {
                firstName: name,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
            });
        return res;
    } catch (err) {
        console.error(err);

    }
}

async function updateUserLastName(lastName, userData) {

    try {
        const userId = localStorage.getItem('userId');
        const res = await axios.put(`${API_BASE_URL}/users/${userId}`,
            {
                firstName: userData.firstName,
                lastName: lastName,
                email: userData.email,
                password: userData.password,
            });
        return res;
    } catch (err) {
        console.error(err);

    }
}

async function updateUserEmail(email, userData) {

    try {
        const userId = localStorage.getItem('userId');
        const res = await axios.put(`${API_BASE_URL}/users/${userId}`,
            {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: email,
                password: userData.password,
            });
        return res;
    } catch (err) {
        console.error(err);

    }
}

async function validatePassword(currentPassword, email) {

    try {
        const res = await axios.post(`${API_BASE_URL}/users/auth/login`,
            {
                email: email,
                password: currentPassword,
            });
        if (res.status !== 200) {
            return false;
        }
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

async function updateUserPassword(newPassword, userData) {
    try {
        const userId = localStorage.getItem('userId');
        const res = await axios.put(`${API_BASE_URL}/users/${userId}`,
            {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: newPassword,
            });
        return res;
    } catch (err) {
        console.error(err);
    }
}


const utils = {
    updateUserName: updateUserName,
    updateUserLastName: updateUserLastName,
    updateUserEmail: updateUserEmail,
    validatePassword: validatePassword,
    updateUserPassword: updateUserPassword
};

export default utils;
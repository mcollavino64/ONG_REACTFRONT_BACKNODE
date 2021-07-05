import axios from 'axios';
import { API_BASE_URL } from '../../app/config';
import AlertService from '../alertService/AlertService';

export const getContactList = async () => {
  try {
    const token = localStorage.getItem('org_token');
    const res = await axios.get(API_BASE_URL + '/contacts', {
      headers: {
       authorization: 'Bearer ' + JSON.parse(token),
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    // AlertService.error("Error", "Hubo un problema al intentar obtener el listado")
  }
};

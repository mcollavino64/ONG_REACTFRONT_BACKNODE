import React, { useState, useEffect } from 'react' ;
import MaterialTable from 'material-table' ;
import './activities.css'
import * as FaIcons from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import FormActivities from '../../Actividades/FormActivities/FormActivities';
import Modal from './../../common/ModalWrapper';
import Alert from '../../alertService/AlertService';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from './../../../app/config';
import { getActivities } from './getActivities';
import { Container } from '@chakra-ui/layout';


function Actividades_Backoffice() {

    const columnas = [
        {
            title:'Nombre Actividad',
            field:'name'
        },
        {
            title:'URL image',
            field:'image'
        },
        {
            title:'Contenido',
            field:'content',
            render: rowData => rowData.content.slice(0, 50) + "..."
        },
        {
            title:'Eliminado',
            field:'deletedAt',
            type:'numeric'
        },
        
    ];

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const token = useSelector(state => state.login.token);
    useEffect(() => {
        getActivities().then((result) => {
            setData(result);
        })
    }, []);

    const handleCloseModal = (success) => {
        if(success)
            getActivities().then(result =>  setData(result));
        onClose();
    }
    const handleDeleteButton = async (activityData) => {
        const confirmed = await Alert.confirm('Esta seguro de querer eliminar esta actividad?', 'Esta accion es irreversible');
        try{
            if(confirmed) {
                const result = await axios.delete(API_BASE_URL + '/activities/' + activityData.id, {
                    headers: { Authorization: 'Bearer ' + token }
                });
                if (result)
                    Alert.success('Hecho', 'La actividad fue eliminada');
                else
                    Alert.error('Ups', 'Parece que hubo un error. Intentelo de nuevo mas tarde');
            }
        } catch(err) {
            console.log(err)
            Alert.error('Ups', 'Parece que hubo un error. Intentelo de nuevo mas tarde');
        }
    }
        return (
            <Container mt="40px" maxW="full">
                <div  className='materialTable'>
                    <MaterialTable 
                        columns={columnas}
                        data = {data}
                        title = 'Actividades'
                        actions={[
                            {
                                icon:FaIcons.FaEdit ,
                                tooltip:'Editar',
                                onClick:(event, rowData) => {
                                    setEditData(rowData);
                                    onOpen();
                                }
                            },
                            {
                                icon:FaIcons.FaTrash ,
                                tooltip:'Eliminar',
                                onClick:(event, rowData) => handleDeleteButton(rowData)
                            }
                        ]}
                        //Agregamos las acciones en la ultima columna
                        options={{
                            actionsColumnIndex:-1
                        }}
                        //cambiamos el titulo de la ultima columna 
                        localization = {{
                            header:{
                                actions : 'Acciones'
                            }
                        }}
                    />
                
                    <Modal isOpen={isOpen} onClose={onClose} label={editData? 'Crear Actividad': 'Editar Actividad'}>
                        <FormActivities data={editData} onClose={handleCloseModal} />
                    </Modal>

                </div>       
            </Container>            
        )

}

export default Actividades_Backoffice;

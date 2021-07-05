import React from 'react';
import { FormControl, Box, VStack, Button, FormLabel } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import AuthInput from './Auth-input';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import parse from "html-react-parser"
import { HStack } from '@chakra-ui/layout';
import axios from 'axios';
import { API_BASE_URL } from './../../../app/config';
import Alert from '../../alertService/AlertService';


export default function FormActivities({ data, onClose }){

    const editMode = data !== null;
    const initialValues = editMode ? data : {
        name: '',
        image: '',
        content: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('* El titulo es requerido'),
        image: Yup.string()
            .required("* El imagen es requerido"),
        content: Yup.string()
            .required('* El contenido no es válido')
    })

    const onSubmit = (values, actions) => {
        const dataBody = {
            name: values.name,
            image: values.image,
            content: values.content // parse(values.content).props.children
        }
        const requestPromise = editMode ?
            axios.patch(`${API_BASE_URL}/activities/${data.id}`, dataBody)
            :
            axios.post(`${API_BASE_URL}/activities`, dataBody);
        requestPromise.then((result) => {
            actions.setSubmitting(false);
            if(result.data?.ok) {
                onClose(true);
                Alert.success('Hecho', editMode ? 'Los cambios ha sido guardados' : 'La actividad ha sido creada');
            } else {
                onClose();
                Alert.error('Ups', 'Hubo un problema. Intente nuevamente más tarde');
            }
        }).catch((error) => {
            actions.setSubmitting(false);
            onClose();
            Alert.error('Ups', 'Hubo un problema. Intente nuevamente más tarde');
        });
    }
   
    return (
        <Box w='full' >
            <h1>Formulario Actividad </h1>
            <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

            {({ handleSubmit, isSubmitting, values, setValues, setFieldValue }) => (

                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <VStack>
                        <FormControl  id="name" isRequired>
                            <FormLabel>Nombre</FormLabel>
                            <AuthInput type="text" name="name"  placeholder="First name" />
                        </FormControl>

                        <FormControl id="imagen" isRequired>
                            <FormLabel>URL imagen</FormLabel>
                            <AuthInput  name="image" placeholder="URL imagen" />
                        </FormControl>

                            <FormControl id="content" isRequired>
                                <FormLabel>Contenido</FormLabel>
                                <CKEditor 
                                    name="content"
                                    editor={ClassicEditor}
                                    data={values.content}
                                    onChange={(event, editor) => {
                                    const textEditor = editor.getData();
                                    setValues({ ...values, content: textEditor });
                                }}
                                />
                            </FormControl>
                            <HStack mt={4}>
                                <Button colorScheme='teal' isLoading={isSubmitting}
                                type='submit'>{editMode? 'Guardar Cambios' : 'Crear Actividad'}</Button>
                                <Button colorScheme='red' onMouseDown={(e) => e.preventDefault()} onClick={onClose}>Cancelar</Button>
                            </HStack>
                    </VStack>
                </Form>
            )}

            </Formik>
        </Box>
    )
}


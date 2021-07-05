import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Button, Center, Box, Select } from '@chakra-ui/react'
import { Formik, Field } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField } from './TextField';
import * as Yup from 'yup'
import parse from "html-react-parser"
// import axios from 'axios';
// import { API_BASE_URL } from '../../app/config';
import { Form } from 'formik';
import { InputGroup } from '@chakra-ui/input';
import { HStack } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { editNew } from './../../features/news/editNewThunk';
import { getToken } from './../../features/login/loginSlice';
import { addNew } from './../../features/news/addNewThunk';
import { fetchNewData } from './../../features/news/fetchNewThunk';
import Alert from '../alertService/AlertService';
import { unwrapResult } from '@reduxjs/toolkit';

export default function NewsForm({ data, onClose }) {

    const dispatch =  useDispatch();
    const token = useSelector(getToken);
    const editMode = data !== null;
    const initialValues = editMode ?
    {
        name: data.name,
        content: data.content,
        categoryId: data.categoryId,
        image: data.image
    }
    : {
        name: '',
        content: '',
        categoryId: '',
        image: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('* El titulo es requerido.'),
        image: Yup.string(),
       /* .test("validate-url", "* Ingrese una URL valida.", (value) => {
            try {
                new URL(value);
              } catch (e) {
                return false;
              }
              return true;
        }),*/
        categoryId: Yup.number()
            .required('* La categoria es requerido.'),
        content: Yup.string()
            .required('* El contenido no es válido.')
    })

    const onSubmit = (values, actions) => {
        const { name, categoryId, content, image } = values;
        values = {
            name,
            categoryId,
            content: parse(content).props.children,
            image
        }
        if(editMode)
            dispatch(editNew({
                token,
                values,
                id: data.id
            }))
            .then(unwrapResult)
            .then((data) => {
                console.log("data devuelta por edit: ", data)
                actions.setSubmitting(false);
                onClose();
                if(data?.success){
                    Alert.success("Listo", "La novedad ha sido modificada exitosamente");
                    dispatch(fetchNewData());
                } else
                    Alert.error("Hubo un problema", "No se pudo modificar la novedad correctamente"); 
            }).catch(() => {
                actions.setSubmitting(false);
                onClose();
                Alert.error("Hubo un problema", "No se pudo modificar la novedad correctamente");
            })
        else{
            dispatch(addNew({
                token,
                values
            }))
            .then(() => {
                actions.setSubmitting(false);
                onClose();
                Alert.success("Listo", "La novedad ha sido creada exitosamente");
            }).catch(() => {
                actions.setSubmitting(false);
                onClose();
                Alert.error("Hubo un problema", "No se pudo crear la novedad correctamente");
            });
    }
}


    return (
        <Center  >
            <Box p="5" borderRadius="lg" >
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >

                    {({ isSubmitting, values, setValues }) => (
                        <Form>
                            <Field name='name'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel  as="samp" fontSize="xl" htmlFor='Titulo'>Titulo</FormLabel>
                                        <InputGroup>
                                            <Input size='lg' borderColor='gray.300' placeholder='Titulo de la Novedad' {...field} />
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="categoryId">
                                {({ field, form }) => (<>
                                <FormControl isInvalid={form.errors.categoryId && form.touched.categoryId}>
                                    <FormLabel  as="samp" fontSize="xl" htmlFor='Categoria'>Categoria</FormLabel>
                                    <Select placeholder="Seleccioné una categoria" {...field}>
                                        <option value={1}>General</option>
                                        <option value={2}>Eventos</option>
                                        <option value={3}>Encuentros</option>
                                        <option value={4}>Educación</option>
                                    </Select>
                                    <FormErrorMessage>{form.errors.categoryId}</FormErrorMessage>
                                </FormControl>
                                </>)}
                            </Field>
                            <Field name="image">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.image && form.touched.image}>
                                        <FormLabel as="samp" fontSize="xl" htmlFor="image url">Image URL: </FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Box >
                                <FormLabel as="samp" fontSize="xl" htmlFor="content">Content: </FormLabel>
                                <CKEditor
                                    name="content"
                                    editor={ClassicEditor}
                                    data={values.content}
                                    config={{height: "500px"}}
                                    onChange={(event, editor) => {
                                        const textEditor = editor.getData();
                                        setValues({ ...values, content: textEditor });
                                    }}

                                />
                            </Box>
                            <HStack mt={4} justify="center" >
                                <Button
                                    w={{ base: "70%", md: "50%", lg: "40%", xl: '30%' }}
                                    colorScheme="twitter"
                                    type="submit"
                                    isLoading={isSubmitting}
                                >{editMode? 'Guardar Cambios' : 'Crear Novedad'}</Button>
                                
                                <Button colorScheme='red' onMouseDown={(e) => e.preventDefault()} onClick={onClose}>Cancelar</Button>
                            </HStack>
                        </Form>
                    )}




                </Formik>
            </Box>
        </Center>
    )
}

import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { FormLabel, InputGroup, Input, Textarea, Button, VStack, HStack, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getToken } from './../../../features/login/loginSlice';
import { useDispatch } from 'react-redux';
import { addCategory } from './../../../features/categories/addCategoryThunk';
import { editCategory } from './../../../features/categories/editCategoryThunk';

export default function CategoriasForm({ data, onClose }) {
    
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const editMode = data !== null;
    const initialValues = editMode ?
    {
        name: data.name,
        description: data.description
    }
    : {
        name: '',
        description: ''
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('* El nombre es requerido'),
        description: Yup.string()
    });
    const onSubmit = (values, actions) => {
        if(editMode)
            dispatch(editCategory({
                token,
                values,
                id: data.id
            })).then(() => {
                actions.setSubmitting(false);
                onClose();
            }).catch(() => {
                actions.setSubmitting(false);
                onClose();
            })
        else{
            dispatch(addCategory({
                token,
                values
            })).then(() => {
                actions.setSubmitting(false);
                onClose();
            }).catch(() => {
                actions.setSubmitting(false);
                onClose();
            });
        }
    }
    return (
        <Box w={{ base: "100%", lg: "85%" }} bg="gray.100" p="5" borderRadius="lg" >
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <VStack spacing={6}>
                            <Field name='name'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor='name'>Nombre</FormLabel>
                                        <InputGroup>
                                            <Input size='lg' borderColor='gray.300' placeholder='Nombre de la categoria' {...field} />
                                        </InputGroup>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='description'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.description && form.touched.description}>
                                        <FormLabel htmlFor='description'>Descripción</FormLabel>
                                        <InputGroup>
                                            <Textarea size='lg' borderColor='gray.300' placeholder='Ingrese una descripción aquí' {...field} />
                                        </InputGroup>
                                    </FormControl>
                                )}
                            </Field>
                            <HStack mt={4}>
                                <Button colorScheme='teal' isLoading={props.isSubmitting}
                                type='submit'>{editMode? 'Guardar Cambios' : 'Crear Categoria'}</Button>
                                <Button colorScheme='red' onMouseDown={(e) => e.preventDefault()} onClick={onClose}>Cancelar</Button>
                            </HStack>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

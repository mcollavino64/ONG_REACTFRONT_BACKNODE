import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../app/config';
import alert from '../../alertService/AlertService';
import { Container, Stack, Box, Heading } from '@chakra-ui/layout';
import { Button, Text } from '@chakra-ui/react';
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/input';
import { BsFillImageFill, BsFillPersonLinesFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import "./ckeditor.css";

export default function () {
  const { state } = useLocation();
  const testimonio = state?.testimonio;

  const [loading, setLoading] = React.useState(false);

  const [id, setId] = React.useState(null); // If ID is not null then we are in edit mode
  const [content, setContent] = React.useState('');
  const [image, setImage] = React.useState('');
  const [name, setName] = React.useState('');

  const { token } = useSelector((state) => state.login);

  // Initialize edit mode if we get a 'testimonio' object
  React.useEffect(() => {
    if (testimonio && id == null) {
      const { name, content, image, id } = testimonio;
      setName(name);
      setContent(content);
      setImage(image);
      setId(id);
    }
  }, [testimonio]);

  // On CKEditor content change
  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  // On text field input change
  const handleInputChange = ({ target }) => {
    if (target.name === 'name') setName(target.value);
    if (target.name === 'image') setImage(target.value);
  };

  // On API failed response (both edit & creation mode)
  const handleFailedResponse = (err) => {
    console.log('handleFailedResponse', err);
    alert.error(
      'Ocurrió un error',
      `No se ha podido completar la solicitud. ${err && err.errors ? 'Error: ' + err.errors[0].msg : ''}`
    );
  };

  // On API success response (both edit & creation mode)
  const handleSuccessResponse = ({ data }) => {
    const isEditMode = id != null;
    const title = isEditMode ? `Testimonio #${id} modificado` : `Testimonio #${data.id} creado`;
    alert.success(title, 'Se han guardado los cambios exitosamente');

    if (!isEditMode) {
      setContent("");
      setName("");
      setImage("");
    }
  };

  // On Submit button click
  const onFormSubmit = () => {
    if (!token)
      return alert.error(
        'Sesión inválida',
        'Tu sesión parece haber expirado o es inválida, guarda el contenido y vuelve a iniciar sesión'
      );

    // TOOD: Validar con formik para que quede mejor
    if (!name) return alert.error('Nombre incompleto', 'El nombre del testimonio es obligatorio');
    if (!content) return alert.error('Contenido incompleto', 'El contenido del testimonio es obligatorio');

    // Axios options
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = { name, content, image };
    
    setLoading(true);

    if (id) {
      // EDIT MODE (PUT)
      axios
        .put(`${API_BASE_URL}/testimonials/${id}`, data, options)
        .then(handleSuccessResponse)
        .catch(handleFailedResponse)
        .finally(() => setLoading(false));
    } else {
      // CREATE MODE (POST)
      axios
        .post(`${API_BASE_URL}/testimonials`, data, options)
        .then(handleSuccessResponse)
        .catch(handleFailedResponse)
        .finally(() => setLoading(false));
    }
  };

  return (
    <Container maxW='container.sm'>
      <Stack align='center' justify='center' spacing={4}>
        <Heading as='h1' size='lg'p={3}>
          {id ? `Modificando Testimonio #${id}` : 'Creando nuevo testimonio'}
        </Heading>
        <InputGroup>
          <InputLeftElement pointerEvents='none' children={<BsFillPersonLinesFill color='gray.300' />} />
          <Input name='name' onChange={handleInputChange} value={name} placeholder='Nombre' />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents='none' children={<BsFillImageFill color='green.500' />} />
          <Input name='image' onChange={handleInputChange} value={image} placeholder='URL de imagen' />
        </InputGroup>

        <Container position="relative" w="108%">
          <CKEditor editor={ClassicEditor} data={content} onChange={handleContentChange} />
          {!content && <Text pointerEvents="none"  position="absolute" top="3.2rem" left="2rem" color="gray.400">Contenido</Text>}
        </Container>

        <Button maxW='15rem' colorScheme='blue' onClick={onFormSubmit} isLoading={loading}>
          {id ? "Actualizar Testimonio" : "Crear Testimonio"}
        </Button>
      </Stack>
    </Container>
  );
}

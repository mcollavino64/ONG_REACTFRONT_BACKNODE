// Component to display a list of activities (frontpage)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './../../app/config';
import Alert from './../alertService/AlertService';
import { Container, Text, Heading, Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { HStack } from '@chakra-ui/react';

import ActivityCardBox from './ActivityCardBox';

// Activities list horizontal scroll bar custom style
const scrollBarStyle = {
  css: {
    '&::-webkit-scrollbar': {
      height: '10px',
    },
    '&::-webkit-scrollbar-track': {
      width: '50%',
      height: '10px',
      borderRadius: '32px',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,0.3)', //rgb(142, 203, 255) rgb(49, 130, 206) rgb(237, 75, 75)
      borderRadius: '32px',
    },
  },
};

const ActividadId = () => {
  const history = useHistory();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load activities list from backend
  useEffect(() => {
    setLoading(true);

    const consultAPI = async () => {
      const url = `${API_BASE_URL}/activities`;

      await axios
        .get(url)
        .then((respuesta) => {
          if (!respuesta.data) throw new Error();
          setActivities(respuesta.data);
          setLoading(false);
        })
        .catch(() => {
          history.push('/');
          Alert.error('Error', 'No se han podido cargar las actividades'); // TODO: Cambiar
        });
    };

    consultAPI();
  }, []);

  // On read more button or activity card click
  const handleReadMoreClick = (id) => history.push(`/actividades/${id}`);

  return (
    <Container
      maxW={{ base: '100%', lg: '90%' }}
      d='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'>
      <Heading as='h1' letterSpacing='wide'>
        Actividades
      </Heading>
      <Text letterSpacing='wide' as='h2' p={5} fontSize='xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      </Text>

      {/* Loading spinner */}
      {loading && <Spinner size='lg' mt={6} />}

      {/* Activities list */}
      <HStack overflowX='scroll' py={5} maxW='100%' {...scrollBarStyle}>
        {activities.map((activity, idx) => (
          <ActivityCardBox key={activity.id || idx} activity={activity} onClick={() => handleReadMoreClick(activity.id)} />
        ))}
      </HStack>
    </Container>
  );
};

export default ActividadId;

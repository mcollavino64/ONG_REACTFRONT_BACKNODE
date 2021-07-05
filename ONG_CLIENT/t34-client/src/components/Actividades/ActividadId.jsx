// Component to display an activity's detail by ID (passed as react-router path param)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './../../app/config';
import Alert from './../alertService/AlertService';
import { Container, Text, Image, VStack, Spinner, Center } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import ActivityHeader from './ActivityHeader';

const ActividadId = () => {
  const { id } = useParams();
  const history = useHistory();

  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);

  // Load activity detail from backend
  useEffect(() => {
    setLoading(true);

    const consultAPI = async () => {
      const url = `${API_BASE_URL}/activities/${id}`;

      await axios
        .get(url)
        .then((respuesta) => {
          if (!respuesta.data) throw new Error();
          setActivity(respuesta.data);
          setLoading(false);
        })
        .catch(() => {
          history.push('/');
          Alert.error('Incorrecto', 'La actividad ingresada no existe');
        });
    };

    consultAPI();
  }, []);

  if (loading)
    return (
      <Center p={10}>
        <Spinner size='lg' />
      </Center>
    );

  return (
    <Container
      maxW='container.lg'
      d='flex'
      borderLeft='1px'
      borderRight='1px'
      borderRightRadius='50px'
      borderLeftRadius='50px'
      borderColor='blackAlpha.300'
      p={8}
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'>
      <VStack spacing={6}>
        <ActivityHeader name={activity.name} date={activity.createdAt} />

        <Image
          rounded='lg'
          boxSize={{ base: '100%', lg: '90%' }}
          height={{ base: '13rem', sm: '22rem', lg: '25rem' }}
          objectFit='cover'
          align='center'
          src={activity.image}
          alt={activity.name}
        />

        <Text letterSpacing='wide' boxSize={{ base: '100%', lg: '90%' }} fontSize='lg'>
          {activity.content}
        </Text>
      </VStack>
    </Container>
  );
};

export default ActividadId;

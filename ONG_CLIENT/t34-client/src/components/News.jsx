import React, { useState, useEffect } from "react";

import {
  Text,
  Button,
  Stack,
  Box,
  Image,
  Badge,
  Grid,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./alertService/AlertService";
import Modal from './common/ModalWrapper';
import NewsForm from "./novelties/NewsForm";
import { AddIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { getNews, isLoading } from './../features/news/newSlice';
import { fetchNewData } from './../features/news/fetchNewThunk';
import { getToken } from './../features/login/loginSlice';
import { deleteNew } from './../features/news/deleteNewThunk';
import Loader from "./Loading/Loader";
import { API_BASE_URL } from './../app/config';
import { unwrapResult } from "@reduxjs/toolkit";

const News = () => {
  /*const [news, setNews] = useState([
    {
      id: "1",
      name: "Juntos por el Poder Colectivo",
      image:
        "https://i1.wp.com/somosmas.org/wp-content/uploads/2017/11/art-2.png?resize=317%2C235&ssl=1",
      content: "Este es un contenido 1",
      createdAt: "2021-05-26 17:08:31",
    },
    {
      id: "2",
      name: "¡Llega a Colombia la tercera edición del FITS!",
      image:
        "https://i0.wp.com/somosmas.org/wp-content/uploads/2018/01/Prisma-2.jpg?resize=400%2C250&ssl=1",
        content: "Este es un contenido 2",
      createdAt: "2021-05-23 16:02:01",
    },
    {
      id: "3",
      name: "Encuentro para Innovadores y Emprendedores Sociales",
      image:
        "https://i1.wp.com/somosmas.org/wp-content/uploads/2017/11/mailing-1.jpg?resize=400%2C250&ssl=1",
      content: "Este es un contenido 3",
      createdAt: "2021-05-24 20:05:12",
    },
    {
      id: "4",
      name: "Consulta Nacional de Alianza por la Niñez ",
      image:
        "https://i2.wp.com/somosmas.org/wp-content/uploads/2017/11/alianza1.png?resize=400%2C250&ssl=1",
        content: "Este es un contenido 4",
      createdAt: "2021-05-24 20:05:12",
    },
    {
      id: "5",
      name: "Presentes en el Foro Educativo Distrital 2021",
      image:
        "https://i1.wp.com/somosmas.org/wp-content/uploads/2017/11/foro1.png?resize=400%2C250&ssl=1",
        content: "Este es un contenido 5",
      createdAt: "2021-05-24 20:05:12",
    },
    {
      id: "6",
      name: "Somos Más apoya a la ART",
      image:
        "https://i0.wp.com/somosmas.org/wp-content/uploads/2020/04/vaki-1.jpg?resize=400%2C250&ssl=1",
        content: "Este es un contenido 6",
      createdAt: "2021-05-24 20:05:12",
    },
    {
      id: "7",
      name: "Promueve la garantia de los derechos de los niños, niñas y adolescentes.",
      image:
        "https://i2.wp.com/somosmas.org/wp-content/uploads/2018/02/27067176_1914361545271622_52931177194889040_n.jpg?resize=400%2C250&ssl=1",
        content: "Este es un contenido 7",
      createdAt: "2021-05-24 20:05:12",
    },
  ]);*/

  const token = useSelector(getToken);
  const [data, setData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewData());
  }, [dispatch])

  const listNews = useSelector(getNews);
  const _isLoading = useSelector(isLoading);
  const handleDeleteButton = async(e, id) => {
    e.preventDefault();
    const confirmed = await Alert.confirm("Estas seguro?", "No podras revertir estos cambios!", "Si, deseo borrarla!");
    if(confirmed) {
      dispatch(deleteNew({ id, token }))
        .then(unwrapResult)
        .then((data) => {
          if(data.success){
            Alert.success("Eliminada!", "La noticia ha sido eliminada exitosamente.");
            dispatch(fetchNewData());
          } else
            Alert.error("Hubo un problema", "No se pudo eliminar la novedad");
        })
        .catch(() => {
          Alert.error("Hubo un problema", "No se pudo eliminar la novedad");
        });
      /* DESCOMENTAR:  Para que funcione con la logica del state local 
      let newsArray = news.filter((news) => news.id !== id);
      setNews(newsArray);*/ 
    }
  };

  const handleEditButton = (news) => {
    setData(news);
    onOpen();
  }

  const handleCreateButton = () => {
    setData(null);
    onOpen();
}

  return (
    <>
      {" "}
      {/* Cada vez que se elimina un news se vuelve a solicitar informacion a la api  */}
      {/* {deleteStatus.status==='success'?consultarAPi() : null} */}
      <Box w="100%" p="5px" mt="8">
        <Flex w="100%" justify="center" alignItems="center" px="5px">
          <Text w="100%" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            my={2} textShadow="1.5px 2px 3px gray">
            Gestionar Novedades</Text>
              
            <Button
              onClick={handleCreateButton}
              bgColor="#fafa88"  py="2"
              border="1px solid gray"
              fontSize="sm"
              _hover={{ border: "3px solid black" }}
            >
              <AddIcon m="1"  />
              <Text >
                CREAR NOVEDAD
              </Text>
            </Button>
        </Flex>
        <Center>
          <Grid
            centerContent
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
            mt="4"
          >
            {listNews.map((news) => (
              <Box
                maxW="xs"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                key={news.id}
                height="380px"
              >
                <Image src={API_BASE_URL + '/' + news.image} alt={news.name} height="250px" />

                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      Novedades
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {news.createdAt?.slice(0, 10)}
                    </Box>
                  </Box>

                  <Box
                    mt="4"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    mb="2"
                  >
                    {news.name}
                  </Box>
                  <Stack direction="row" align="center">
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="solid"
                      onClick={(e) => handleDeleteButton(e, news.id)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="green"
                      variant="solid"
                      onClick={() => handleEditButton(news)}
                    >
                      Editar
                    </Button>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Grid>
        </Center>
      </Box>
      <Modal label={data? "Editar Novedad" : "Crear Novedad"}
        isOpen={isOpen} onClose={onClose} >
        <NewsForm data={data} onClose={onClose} />
      </Modal>
      <Loader isLoading={_isLoading} />
    </>
  );
};

export default News;

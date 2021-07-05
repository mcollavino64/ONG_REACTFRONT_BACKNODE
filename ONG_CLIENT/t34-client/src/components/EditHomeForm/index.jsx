import React from "react";
import { Button } from "@chakra-ui/button";
import { CheckCircleIcon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import {
  Box,
  HStack,
  VStack,
  Text,
  Divider,
  ListItem,
  OrderedList,
} from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { FiType } from "react-icons/fi";
import { Formik } from "formik";
import * as Yup from "yup";
import Footer from "../layout/footer";

export default function EditHomeForm() {
  const initialValues = {
    textAreaValue: "",
    slide1Title: "",
    slide1Img: "",
    slide2Title: "",
    slide2Img: "",
    slide3Title: "",
    slide3Img: "",
  };
  const validationSchema = Yup.object({
    textAreaValue: Yup.string()
      .required("* El texto de bienvenida es requerido")
      .min(20, "* El mínimo son 20 caracteres")
      .max(100, "* El máximo son 100 caracteres"),
    slide1Title: Yup.string().required("* El título es requerido"),
    slide1Img: Yup.string()
      .url("Ingrese una URL válida")
      .required("* La URL es requerida"),
    slide2Title: Yup.string().required("* El título es requerido"),
    slide2Img: Yup.string()
      .url("Ingrese una URL válida")
      .required("* La URL es requerida"),
    slide3Title: Yup.string().required("* El título es requerido"),
    slide3Img: Yup.string()
      .url("Ingrese una URL válida")
      .required("* La URL es requerida"),
  });

  const onSubmit = (values) => {
    const formData = values;
    console.log("Form data", formData);
  };

  return (
    <Box w="full" bg="#F5F6F9">
      {/* Titulo de la página */}
      <VStack px={4} my={8}>
        <HStack my={6}>
          <EditIcon w={6} h={6} color="gray.600" />
          <Text
            fontSize="1.5em"
            fontWeight="medium"
            my={8}
            color="gray.600"
            textDecoration="underline"
          >
            Editar contenido de la página de inicio
          </Text>
        </HStack>
      </VStack>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, handleBlur, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <VStack px={4} mx="auto" my={4} w={["full", "full", "750px"]}>
              <Text fontSize="xl" color="gray.600" alignSelf="start">
                • Editar texto de bienvenida
              </Text>
              {/* TextArea para editar texto de bienvenida */}
              <Textarea
                placeholder="Ingrese su texto de bienvenida. "
                borderColor="gray.600"
                resize="none"
                h="20vh"
                bg="white"
                onChange={handleChange}
                onBlur={handleBlur}
                name="textAreaValue"
              />
              {errors.textAreaValue && touched.textAreaValue ? (
                <Text color="red">{errors.textAreaValue}</Text>
              ) : null}
            </VStack>
            {/* Forms para editar cada slide */}
            <VStack
              px={4}
              align="start"
              my={4}
              w={["full", "full", "750px"]}
              mx="auto"
            >
              <HStack my={4}>
                <Text fontSize="xl" color="gray.600">
                  • Editar slides
                </Text>
              </HStack>
              <OrderedList
                px={[6, 0]}
                my={4}
                color="gray.600"
                display="flex"
                flexDirection={["column", "column", "row"]}
                w="full"
              >
                {/* Slide 1 */}
                <VStack mx={["0px", "16px"]}>
                  <ListItem
                    my={4}
                    w={["full", "full", "auto"]}
                    textAlign={["start", "start", "center"]}
                  >
                    Slider
                  </ListItem>

                  <InputGroup borderColor="gray.600" my={4}>
                    <InputLeftAddon children={<FiType color="gray.600" />} />
                    <Input
                      bg="white"
                      placeholder="Título"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="slide1Title"
                    />
                  </InputGroup>
                  {errors.slide1Title && touched.slide1Title ? (
                    <Text color="red">{errors.slide1Title}</Text>
                  ) : null}

                  <InputGroup borderColor="gray.600">
                    <InputLeftAddon children={<LinkIcon color="gray.600" />} />
                    <Input
                      bg="white"
                      placeholder="URL de la imagen"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="slide1Img"
                    />
                  </InputGroup>
                  {errors.slide1Img && touched.slide1Img ? (
                    <Text color="red">{errors.slide1Img}</Text>
                  ) : null}

                  <Divider
                    borderColor="gray.600"
                    my={8}
                    orientation="vertical"
                  />
                </VStack>
                {/* Slide 2 */}
                <VStack mx={["0px", "16px"]}>
                  <ListItem
                    my={4}
                    w={["full", "full", "auto"]}
                    textAlign={["start", "start", "center"]}
                  >
                    Slider
                  </ListItem>

                  <InputGroup borderColor="gray.600" my={4}>
                    <InputLeftAddon children={<FiType color="gray.600" />} />
                    <Input
                      bg="white"
                      placeholder="Título"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="slide2Title"
                    />
                  </InputGroup>
                  {errors.slide2Title && touched.slide2Title ? (
                    <Text color="red">{errors.slide2Title}</Text>
                  ) : null}

                  <InputGroup borderColor="gray.600">
                    <InputLeftAddon children={<LinkIcon color="gray.600" />} />
                    <Input
                      bg="white"
                      placeholder="URL de la imagen"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="slide2Img"
                    />
                  </InputGroup>
                  {errors.slide2Img && touched.slide2Img ? (
                    <Text color="red">{errors.slide2Img}</Text>
                  ) : null}

                  <Divider
                    borderColor="gray.600"
                    my={8}
                    orientation="vertical"
                  />
                </VStack>
                {/* Slide 3 */}
                <VStack mx={["0px", "16px"]}>
                  <ListItem
                    my={4}
                    w={["full", "full", "auto"]}
                    textAlign={["start", "start", "center"]}
                  >
                    Slider
                  </ListItem>

                  <InputGroup borderColor="gray.600" my={4}>
                    <InputLeftAddon children={<FiType color="gray.600" />} />
                    <Input
                      bg="white"
                      placeholder="Título"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="slide3Title"
                    />
                  </InputGroup>
                  {errors.slide3Title && touched.slide3Title ? (
                    <Text color="red">{errors.slide3Title}</Text>
                  ) : null}

                  <InputGroup borderColor="gray.600">
                    <InputLeftAddon children={<LinkIcon color="gray.600" />} />
                    <Input
                      bg="white"
                      placeholder="URL de la imagen"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="slide3Img"
                    />
                  </InputGroup>
                  {errors.slide3Img && touched.slide3Img ? (
                    <Text color="red">{errors.slide3Img}</Text>
                  ) : null}

                  <Divider
                    borderColor="gray.600"
                    my={8}
                    orientation="vertical"
                  />
                </VStack>
              </OrderedList>
            </VStack>
            {/* Botón para confirmar cambios */}
            <HStack w="full">
              <Button
                bg="#18A0FB"
                color="white"
                mb={12}
                mx="auto"
                mt={[4, 4, 8]}
                _hover={{ bg: "gray.600" }}
                type="submit"
              >
                Confirma los cambios <CheckCircleIcon mx={2} />
              </Button>
            </HStack>
          </form>
        )}
      </Formik>
    </Box>
  );
}

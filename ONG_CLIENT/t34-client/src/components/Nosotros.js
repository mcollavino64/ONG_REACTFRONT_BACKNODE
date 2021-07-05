import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../app/config";
import {
  Box,
  Text,
  Grid,
  Image,
  Container,
  Heading,
  Divider,
} from "@chakra-ui/react";

const Nosotros = () => {
  const [members, setMembers] = useState("");

  useEffect(() => {
    (async function getMembers() {
      const members = await axios.get(`${API_BASE_URL}/members`);
      setMembers(members.data);
    })();
  }, []);

  return (
    <Container maxW="container.lg">
      <Heading align="center" as="h1" fontSize="4xl" mb={5}>
        Sobre nosotros
      </Heading>
      <Text align="center" fontSize="xl" mb={50}>
        lorem ipsum dolor sit amet, consectet
      </Text>
      <Divider />

      <Heading align="center" as="h2" fontSize="4xl" mb={5} mt={5}>
        Miembros
      </Heading>
      <Text align="center" fontSize="xl" mb={5}>
        lorem ipsum dolor sit amet, consectet
      </Text>
      <Grid
        centerContent
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        mt="4"
      >
        {members
          ? members.map((member) => (
              <Box
                maxW="lg"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                key={member.id}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  objectFit="cover"
                  boxSize="250px"
                />

                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Box
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="sm"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {member.name}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          : null}
      </Grid>
    </Container>
  );
};

export default Nosotros;

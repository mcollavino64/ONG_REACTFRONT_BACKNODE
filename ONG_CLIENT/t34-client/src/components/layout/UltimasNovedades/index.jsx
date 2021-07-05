import React, { useState, useEffect } from "react";
import { Box, Text, Grid, Stack, Button, VStack } from "@chakra-ui/react";
import axios  from 'axios';
import { API_BASE_URL } from './../../../app/config';
import { Link } from 'react-router-dom';

export default function UltimasNovedades() {
  const [novelties, setNovelties] = useState([])
  useEffect(() => {
    (async function getEntries() {
      const entries = await axios.get(`${API_BASE_URL}/news`);
      setNovelties(entries.data.slice(0, 4));
    })();
  }, [])

  return (
    <Box
      p=".5em"
      paddingRight="0"
      alignContent="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
    >
      <Text
        fontSize={{ base: "32px", md: "40px", lg: "48px" }}
        textAlign="center"
        fontWeight="400"
        my=".5em"
      >
        Últimas novedades
      </Text>
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", lg:"repeat(4, 1fr)"}}
        gap={6}
        h={{base:"15rem", md:"25rem", lg:"15rem"}}
        px=".5em"
        my="1em"
        overflowX="scroll"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {novelties.map((novedad) => (
          <VStack
            key={novedad.id}
            h="full" w="full"
            justifySelf="center"
            backgroundImage={API_BASE_URL + '/' + novedad.image}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            bgBlendMode="darken"
            bgColor="rgba(0,0,0, 0.3)"
            borderRadius="5px"
            justify="center"
            transition=".5s"
            _hover={{
              bgColor: "rgba(0,0,0, 0.1)",
            }}
          >
            <Text color="white" fontSize="1.5em">
              {novedad.name}
            </Text>
            <Button
              as={Link}
              to={"/novedades/"+novedad.id}
              border="1px"
              height="30px"
              borderColor="#18A0FB"
              bg="rgba(0,0,0, 0.1)"
              w="70px"
              color="#18A0FB"
            >
              VER
            </Button>
          </VStack>
        ))}
      </Grid>
      <Stack mx="auto" my="2em">
        <Button
          as={Link}
          to="/novedades"
          border="1px"
          borderColor="#18A0FB"
          bg="white"
          w="130px"
          color="#18A0FB"
        >
          Ver todas
        </Button>
      </Stack>
    </Box>
  );
}

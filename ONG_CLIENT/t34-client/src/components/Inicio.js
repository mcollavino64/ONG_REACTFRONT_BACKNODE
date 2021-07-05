import React from "react";
import UltimasNovedades from "./layout/UltimasNovedades";
import Slider from '../components/carousel/Carousel';

import { Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { publicData } from "../app/publicInfoSlice";

export default function Inicio() {
  const { welcomeText } = useSelector(publicData)

  return (
    <>
      <Slider/>      
      <Heading textAlign="center" fontSize={{ base: "xl", md: "1xl", lg: "3xl" }} my={8} >
        {welcomeText}
      </Heading>
      <UltimasNovedades />
    </>
  );
}

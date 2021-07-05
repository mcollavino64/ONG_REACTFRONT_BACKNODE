import React from 'react';
import { Box, Container, Link, Stack, Text, VStack, HStack } from '@chakra-ui/layout';
import { MdEmail } from 'react-icons/md';
import { GrFacebook } from 'react-icons/gr';
import { FaPhoneSquareAlt, FaTwitterSquare } from 'react-icons/fa';
import { ImInstagram } from 'react-icons/im';
import { SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const AboutUs = (
  <>
    <Text>
      Somos una asociación civil sin fines de lucro que se creó en 1997 con la intención de dar alimento a las familias
      del barrio.
    </Text>
    <Text>
      Con el tiempo fuimos involucrándonos con la comunidad y agrandando y mejorando nuestra capacidad de trabajo.
    </Text>
    <Text>
      Hoy somos un centro comunitario que acompaña a más de 700 personas a través de las áreas de: Educación, deportes,
      primera infancia, salud, alimentación y trabajo social.
    </Text>
  </>
);

export default function ContactoMsg() {
  const { data } = useSelector((state) => state.publicInfo);

  const socialLinks = [
    {
      link: `https://www.facebook.com/${data.orgContact[0].facebook}`,
      icon: <GrFacebook />,
      value: data.orgContact[0].facebook,
      default: 'Somos_Más',
      color: 'blue.600',
    },
    {
      link: `https://www.instagram.com/${data.orgContact[0].instagram}`,
      icon: <ImInstagram />,
      value: data.orgContact[0].instagram,
      default: 'SomosMás',
      color: '#E83C78',
    },
    {
      link: `https://www.twitter.com/${data.orgContact[0].twitter}`,
      icon: <FaTwitterSquare />,
      value: data.orgContact[0].twitter,
      default: 'SomosMás',
      color: 'cyan.500',
    },
    {
      link: `tel:${data.phone}`,
      icon: <FaPhoneSquareAlt />,
      value: data.phone,
      default: '1160112988',
      color: 'green.400',
    },
  ];

  const SocialLinks = (
    <SimpleGrid spacing={5} columns='2' w={{ base: '95%', md: '75%' }}>
      {socialLinks.map((social) => (
        <HStack key={social.label} color={social.color} fontSize='lg' justify='center'>
          {social.icon}
          <Link isExternal={social.value != null} href={`${social.value ? social.link : '#'}`}>
            {social.value || social.default}
          </Link>
        </HStack>
      ))}
    </SimpleGrid>
  );

  return (
    <VStack border='gray.100 solid 1px' pr={5}>
      <Box flexShrink={0} marginX='7' mb={5}>
        <Container centerContent>
          <Stack spacing={6}>
            <Box fontSize='3xl' align='center' fontWeight='bold' borderBottom='2px' borderColor='red.100' pb={2} mb={3}>
              Contacto
            </Box>
            <VStack spacing={5} letterSpacing='wide' color='gray.800'>
              {AboutUs}
            </VStack>
          </Stack>
          <HStack
            fontSize={{ base: 'md', sm: 'lg' }}
            justify='center'
            mb={5}
            mt={6}
            borderTop='1px'
            borderColor='gray.200'
            pt={5}>
            <MdEmail />
            <Link isExternal href={`mailto:${data.orgContact[0].email || 'somosfundacionmas@gmail.com'}`}>
              {data.orgContact[0].email || 'somosfundacionmas@gmail.com'}
            </Link>
          </HStack>
          {SocialLinks}
        </Container>
      </Box>
    </VStack>
  );
}

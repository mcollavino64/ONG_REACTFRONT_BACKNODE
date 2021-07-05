// Component to display activity name with date as header

import React from 'react';
import { Badge, Heading, Icon, VStack } from '@chakra-ui/react';
import { AiFillCalendar } from 'react-icons/ai';

const ActivityHeader = ({ name, date }) => {
  return (
    <VStack spacing={3}>
      <Heading
        borderTop='2px'
        borderBottom='2px'
        py='15px'
        borderTopColor='red.300'
        borderBottomColor='yellow.300'
        letterSpacing='wide'>
        {name}
      </Heading>
      <Badge
        variant='outline'
        borderRadius='full'
        px='7'
        py='1'
        colorScheme='blue'
        color='blue.300'
        d='flex'
        alignItems='center'>
        <Icon as={AiFillCalendar} mr='2px' />
        {new Date(date).toLocaleDateString()} | Actividad
      </Badge>
    </VStack>
  );
};

export default ActivityHeader;

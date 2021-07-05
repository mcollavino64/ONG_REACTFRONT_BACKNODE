// Card Box with background image to summarize an activity

import React from 'react';
import { Box, VStack, Heading, Button, Text } from '@chakra-ui/react';

const MAX_TEXT_LENGTH = 100; // Max characters to display as summary

const ActivityCardBox = ({ activity, onClick }) => {
  return (
    <Box
      backgroundImage={activity.image}
      color='white'
      minH='xs'
      rounded='md'
      backgroundPosition='center'
      _hover={{ backgroundSize: 'cover' }}>
      <Box
        as='button'
        d='flex'
        flexDirection='column'
        justifyContent='center'
        rounded='md'
        alignItems='center'
        textAlign='center'
        onClick={onClick}
        p={5}
        bg='blackAlpha.600'
        w='sm'
        h='xs'>
        <VStack spacing={3}>
          <Heading as='h3' size='md' letterSpacing='wide'>
            {activity.name}
          </Heading>

          <Text letterSpacing='wide' boxSize={{ base: '100%', lg: '90%' }} fontSize='lg'>
            {activity.content?.slice(0, MAX_TEXT_LENGTH) + '...'}{' '}
          </Text>
          <Button onClick={onClick} colorScheme='blue' _hover={{ bg: 'blue.300' }}>
            Leer más
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ActivityCardBox;

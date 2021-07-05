import React from 'react';
import { VStack } from '@chakra-ui/layout';
import UserInputs from './UserInputs'


export default function ProfileForm({ userData }) {

    return (
            <VStack align="center"  padding="1.5"
            border="gray.100 solid 1px" fontSize=".9rem">
                <UserInputs userData={userData} />
            </VStack>
    )

}


import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/layout';
import ProfileForm from './ProfileForm'
import DeleteAccount from './DeleteAccount'
import ChangePassword from './ChangePassword'
import { Stack } from '@chakra-ui/react';
import getUserInfo from './getUserInfo'



export default function Profile() {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        async function fetchData() {

            const data = await getUserInfo()
            if (data) {
                console.log("data:", data)
                setUserData(data)
            }
        }
        fetchData()
    }, [])

    return (
        <VStack mx="auto" spacing={5} py="15px">
            <Box textAlign="center" mt={10}>
                <Heading as="h1" size="xl" >
                    Mi perfil
                </Heading>
            </Box>
            <VStack py="30px" width={{ base: "95%", md: "70%", xl: "35%" }} rounded="lg" shadow="lg" bg="white">
                <Text as="u" fontSize="xl" textAlign="center" >Información</Text>
                <ProfileForm userData={userData} />
            </VStack>
            <Stack direction={{ base: "column", sm: "row" }} rounded="lg" shadow="lg" bg="white">
                <ChangePassword userData={userData} />
                <DeleteAccount />
            </Stack>

        </VStack>
    )
}
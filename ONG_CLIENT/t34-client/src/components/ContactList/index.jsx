import React, { useEffect, useState } from 'react';
import { getContactList } from './getContacts'
import { Box, Center, Heading } from '@chakra-ui/layout';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    Td,
} from "@chakra-ui/react"

export default function ListaContactos() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        async function fetchData() {

            const data = await getContactList()
            if (data) {
                setContacts(data)
            }
        }
        fetchData()
    }, [])

    return (
        <Center pt="5rem" d="flex" flexDirection="column">
            <Heading mb={3} mt={-10}>Contactos</Heading>

            <Box overflow="auto" mb={5} display={{ md: "flex" }} width="65%" rounded="md" shadow="xl">
                <Table variant="striped" bgColor={"#9AC9FB"}>
                    <Thead>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Telefono</Th>
                            <Th>Email</Th>
                        </Tr>
                    </Thead>
                    {contacts.length === 0 ?
                        <TableCaption >
                            <Heading size="md" textAlign="center" mb={5}>No hay contactos almacenados</Heading>
                        </TableCaption>
                        : null
                    }
                    <Tbody>
                        {contacts.length > 0 ? contacts.map(contact =>
                            <Tr key={contact.id}>
                                <Td>{contact.name}</Td>
                                <Td>{contact.phone}</Td>
                                <Td>{contact.email}</Td>
                            </Tr>)
                            : null
                        }
                    </Tbody>
                </Table>
            </Box >

        </Center>
    )
}
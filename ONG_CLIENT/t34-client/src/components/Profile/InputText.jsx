import React from 'react';
import { Button } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Text } from "@chakra-ui/layout"

const InputText = (props) => {


    return (
        <>
            <Text>{props.name}</Text>
            <InputGroup>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={props.handler} textAlign="center" rounded>
                        Editar
                    </Button>
                </InputRightElement>
                <Input
                    textAlign="center"
                    fontSize="2xl"
                    bg="gray.100"
                    shadow="md"
                    text-overflow="ellipsis"
                    white-space="nowrap"
                    overflow="hidden"
                    readOnly={true}
                    defaultValue={props.userData}
                ></Input>
            </InputGroup>
        </>
    )
}

export default InputText
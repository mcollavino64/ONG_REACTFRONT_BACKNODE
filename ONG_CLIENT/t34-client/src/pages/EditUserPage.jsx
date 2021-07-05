import { Center } from "@chakra-ui/layout";
import * as React from "react";
import { VStack, Text } from "@chakra-ui/react";

import EditUserForm from "../components/EditUser/editUserForm";
import AuthBox from "../components/authentication/AuthBox";
import { useHistory } from "react-router-dom";

export default function RegisterPage() {
  const history = useHistory();

  // On register form submit
  // This callback will only be called after successful validation with the login information
  const handleEditUserSubmit = (values, actions) => {
    // Shape of values: { firstName: string, lastName: string, roleId: string }

    // TODO: Sacar este timeout y hacer una llamada al backend
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false); // Set form loading state to false
    }, 1000);
  };

  return (
    <Center
      h={{ base: "100%", md: "65vh" }}
      bg="#F5F6F9"
      w="100%"
      d="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Box */}
      <AuthBox maxW="md" position="relative">
        <VStack
          w={{ base: "90%", sm: "80%" }}
          d="flex"
          alignItems="center"
          spacing={3}
          justifyContent="center"
          textAlign="center"
        >
          {/* Box header */}
          <Text fontSize="4xl" fontWeight="medium">
            Editar perfil
          </Text>

          <div />

          {/* Form */}
          <EditUserForm onEditUserSubmit={handleEditUserSubmit} />
        </VStack>
      </AuthBox>
    </Center>
  );
}

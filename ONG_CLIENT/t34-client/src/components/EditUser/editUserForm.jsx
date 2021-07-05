import * as React from "react";
import {
  FormControl,
  FormErrorMessage,
  Box,
  VStack,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import AuthSubmitButton from "../authentication/AuthSubmitButton";
import AuthInput from "../authentication/AuthInput";
import { PropTypes } from "prop-types";
import { validateName } from "../authentication/formValidators";
import { HStack } from "@chakra-ui/react";
import { HiPencil } from "react-icons/hi";

// TODO: Get default values from Redux store

function EditUserForm({ onEditUserSubmit, ...props }) {
  return (
    <Box w="full" {...props}>
      <Formik
        initialValues={{ firstName: "", lastName: "", roleId: "" }}
        onSubmit={onEditUserSubmit}
      >
        {(props) => (
          <Form>
            <VStack spacing={5}>
              <HStack>
                {/* Firstname input */}
                <Field name="firstName" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.firstName && form.touched.firstName
                      }
                    >
                      <AuthInput
                        Icon={HiPencil}
                        type="text"
                        {...field}
                        id="firstName"
                        placeholder="Nombre"
                      />
                      <FormErrorMessage>
                        {form.errors.firstName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Lastname input */}
                <Field name="lastName" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.lastName && form.touched.lastName}
                    >
                      <AuthInput
                        Icon={HiPencil}
                        type="text"
                        {...field}
                        id="lastName"
                        placeholder="Apellido"
                      />
                      <FormErrorMessage>
                        {form.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>

              {/* Change role */}
              <Field name="roleId" as="select">
                {({ field, form }) => (
                  <FormControl id="roleId">
                    <Select
                      size="lg"
                      borderColor="gray.300"
                      {...field}
                      placeholder="Seleccionar nuevo rol"
                    >
                      <option value="Admin">Administrador</option>
                      <option value="Standard">Standard</option>
                    </Select>
                  </FormControl>
                )}
              </Field>

              {/* Login Button */}
              <AuthSubmitButton type="submit" isLoading={props.isSubmitting}>
                Confirmar cambios
              </AuthSubmitButton>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

EditUserForm.defaultProps = {
  onEditUserSubmit: null,
};

EditUserForm.propTypes = {
  onEditUserSubmit: PropTypes.func,
};

export default EditUserForm;

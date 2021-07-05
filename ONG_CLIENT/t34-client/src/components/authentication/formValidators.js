// Formik validators shared between login form and register form
import { AUTH_FORM_VALIDATIONS } from '../../app/config';

export function validateEmail(value) {
  let error;
  if (!value) error = 'El email es requerido';
  else if (!value.match(AUTH_FORM_VALIDATIONS.EMAIL_REGEX)) error = 'Introduce un email válido';
  return error;
}

export function validatePassword(value) {
  let error;
  if (!value) error = 'La contraseña es requerida';
  else if (value.length < AUTH_FORM_VALIDATIONS.MIN_PASSWORD_LENGTH)
    error = 'La contraseña debe 6 o más caracteres';

  return error;
}

export function validateConfirmPassword(value, passwordToCompare) {
  let error = validatePassword(value);
  
  if (value !== passwordToCompare) error = "Las contraseñas no coinciden";

  return error;
}

export function validateName(value) {
  let error;

  if (!value) error = "Este campo es requerido";
  else if (value.length < AUTH_FORM_VALIDATIONS.MIN_NAME_LENGTH) error = "Introduce un nombre válido";

  return error; 
}

export function validateTermsAgreement(value) {
  let error;

  if (!value) error = "Debes aceptar los Términos y Condiciones";

  return error;
}
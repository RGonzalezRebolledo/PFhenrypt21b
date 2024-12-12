
import {
  valuesTypesRegisterPrueba,

} from "@/interfaces/TypesRegister";

export const velidateFormRegister = (form: valuesTypesRegisterPrueba) => {
  //const errors: Partial<valuesTypesRegisterPrueba> = {};

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{5,}$/;
  const regexPhone = /^\+?\d{5,15}$/;
  const regexDni = /^[A-Za-z0-9]{5,15}$/;

  const errors: Partial<valuesTypesRegisterPrueba> = {};

  // Validar el nombre
  if (!form.name) {
    errors.name = "El nombre es requerido";
  } else if (!regexName.test(form.name)) {
    errors.name = `El campo 'Nombre' debe contener solo letras y espacios, pero has escrito: '${form.name}'.`;
  }

  // Validar el correo
  if (!form.email) {
    errors.email = "El correo electónico es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email =
      "Por favor, ingresa una dirección de correo electrónico válida.";
  }

  // Validar la contraseña
  if (!form.password) {
    errors.password = "La contraseña es requerida";
  } else if (!regexPassword.test(form.password)) {
    errors.password =
      "La contraseña debe cumplir con los requisitos: al menos 5 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.";
  }

  // Validar la confirmación de la contraseña
  if (!form.confirm_password) {
    errors.confirm_password = "La confirmación de la contraseña es requerida";
  } else if (form.password !== form.confirm_password) {
    errors.confirm_password = "Las contraseñas no coinciden";
  }

  // Validar el teléfono
  if (!form.phone) {
    errors.phone = "El teléfono es requerido";
  } else if (!regexPhone.test(form.phone)) {
    errors.phone =
      "El número de teléfono debe tener entre 5 y 15 dígitos, y puede incluir un signo de más";
  }

  // Validar el DNI
  if (!form.dni) {
    errors.dni = "El DNI es requerido";
  } else if (!regexDni.test(form.dni)) {
    errors.dni = "El DNI debe tener entre 5 y 12 caracteres alfanuméricos.";
  }

  return errors;
};


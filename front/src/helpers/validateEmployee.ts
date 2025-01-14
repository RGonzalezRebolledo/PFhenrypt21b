import { IEmployeeError, IEmployeeProps } from "@/interfaces/TypeEmployee";

export const validateEmployee = (values: IEmployeeProps) => {
  const errors: IEmployeeError = {};

  // validar el nombre completo
  if (!values.name) {
    errors.name = "El nombre es requerido";
  }

  // validar el DNI
  if (!values.dni || !Number.isInteger(values.dni)) {
    errors.dni = "El DNI es requerido";
  }

  // validar la fecha de nacimiento
  if (!values.birthdate) {
    errors.birthdate = "La fecha de nacimiento es requerida";
  }

  // validar el telefono
  // if (!values.phone || !Number.isInteger(values.phone)) {
    if (!values.phone) {
    errors.phone = "El teléfono es requerido";
  }

  // validar el rol
  if (!values.role) {
    errors.role = "El rol es requerido";
  }

  return errors;
}
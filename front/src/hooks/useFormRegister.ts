import { valuesTypesRegisterPrueba } from "../interfaces/TypesRegister";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { velidateFormRegister } from "@/helpers/validateRegister";

type typeFormVR = (
  form: valuesTypesRegisterPrueba
) => Partial<valuesTypesRegisterPrueba>;

type DataFormType = {
  (data: Omit<valuesTypesRegisterPrueba, 'confirm_password'>): Promise<unknown>;
};
export const useFormRegister = (
  initialForm: valuesTypesRegisterPrueba,
  validateForm: typeFormVR,
  dataForm: DataFormType,
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<valuesTypesRegisterPrueba>>({});
  const [loading, setLoading] = useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState(false);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof valuesTypesRegisterPrueba; value: string };
  
    // Validar solo el campo que perdió el foco
    const fieldError = velidateFormRegister({ ...form, [name]: value });
  
    // Actualizar solo el campo correspondiente en el estado de errores
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError[name],
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm(form);

    if (Object.keys(formErrors).length === 0) {
      const { confirm_password, ...newData } = form;
      setLoading(true)
console.log(confirm_password);

      try {
        const result = await dataForm(newData);

        if (result) {
          console.log("Usuario registrado exitosamente: ", result);
          setIsErrorResponse(false);

          setIsSuccessResponse(true);
          router.push("/login");
          Swal.fire({
            text: "Te has registrado correctamente.",
            title: "Registrado",
            icon: "success",
          });
          setLoading(false)
        } else {
          setIsErrorResponse(true)
          Swal.fire({
            text: "Ha ocurrido un error al registrarse.",
            title: "Error",
            icon: "error",
          });
        }
      } catch (error) {
        console.log("Error al registrar:", error);
        Swal.fire({
          text: "Ha ocurrido un error al registrarse.",
          title: "Error",
          icon: "error",
        });
      }
    } else {
      setErrors(formErrors);
      console.log("Hay errores en el formulario", formErrors);
    }
  };

  return {
    form,
    errors,
    isSuccessResponse,
    isErrorResponse,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

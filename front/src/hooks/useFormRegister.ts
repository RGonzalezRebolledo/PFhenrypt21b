import { valuesTypesRegisterPrueba } from "../interfaces/TypesRegister";
import { useState } from "react";



type typeFormVR = (form: valuesTypesRegisterPrueba) => Partial<valuesTypesRegisterPrueba>

export const useFormRegister = (initialForm: valuesTypesRegisterPrueba, validateForm: typeFormVR, dataForm) => {
const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState<Partial<valuesTypesRegisterPrueba>>({});
    const [loading, setLoading] = useState(false);
    const [isSuccessResponse, setIsSuccessResponse] = useState(false);
    const [isErrorResponse, setIsErrorResponse] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setForm(
            {
            ...form,
            [name]: value
        }
        );
        console.log(form);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateForm(form);

        if(Object.keys(formErrors).length === 0) {
            const { confirm_password, ...newData } = form;

            try {
            const result = await dataForm(newData);

            if(result) {
                console.log('Datos enviados');
                setIsErrorResponse(false);
                setIsSuccessResponse(true);
            } else {
                setIsErrorResponse(true);
            }
            } catch (error) {
                console.error('Error al registrar:', error);
            }
        }  else {
            setErrors(formErrors); 
            console.log('Hay errores en el formulario');
        };

    };
    

    return {
        form,
        errors,
        isSuccessResponse,
        isErrorResponse,
        handleChange,
        handleBlur,
        handleSubmit
    };
};
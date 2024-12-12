import { valuesTypesRegister } from "@/interfaces/TypesRegister";


export const fetchRegister = async (form: Omit<valuesTypesRegister, 'confirm_password'>) => {
    const APIURL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const result = await fetch(`${APIURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        if(result.ok) {
            const data = await result.json();
            console.log('¡Usuario creado exitosamente!');
            return data
        } else {
            const errorData = await result.json();
            console.log('Error al registrar usuario:', errorData);
            throw new Error(errorData.message || 'Error desconocido');
        };

    } catch (error) {

        console.log('Error al registrar usuario:', error);

        throw error;
    };

};
"use client";
// ACTUAL
import { useState } from "react";
import { createEmployee,updateEmployeeById } from "@/api/employee";

import { validateEmployee } from "@/helpers/validateEmployee";
import EmployeeList from "./EmployeeList";
import { IEmployeeProps } from "@/interfaces/TypeEmployee";
import { IEmployeeError } from "@/interfaces/TypeEmployee";
import Swal from "sweetalert2";

export default function EmployeeForm() {
  const [fullName, setFullName] = useState("");
  const [dni, setDni] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<IEmployeeError>({});

  // Agregar estado para manejar el empleado seleccionado y el modo de actualización
  const [modoActualizar, setModoActualizar] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<IEmployeeProps | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: IEmployeeProps = {
      name: fullName,
      dni: Number(dni),
      birthdate: new Date(birthDate),
      phone: Number(phone),
      role,
    };
    
    const validationErrors = validateEmployee(newEmployee);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
                // ACTUALIZO O REGISTRO DEPENDE DEL CASO
              //   let response;
              //   if (modoActualizar) {

              //     // NECESITO ESTE ENDPOINT
              //      response = await updateEmployeeById(newEmployee);
              //   } else {
                const response = await createEmployee(newEmployee);
              // }

        if (response.success) {
          console.log("Empleado procesado exitosamente:", response.data);
          setFullName("");
          setDni("");
          setBirthDate("");
          setPhone("");
          setRole("");

          setModoActualizar(false);
          Swal.fire({
            title: "Empleado procesado",
            text: "El empleado se ha procesado exitosamente",
            icon: "success",
          });
        } else {
          console.error("Error al procesar empleado:", response.error);
          Swal.fire({
            title: "Error",
            text: "Hubo un error al procesar el empleado",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error al procesar empleado:", error);
      }
    }
  };

  // Función para manejar la selección de un empleado
  const handleSelectEmployee = (employee: IEmployeeProps) => {

    setFullName("");
    setDni("");
    // setBirthDate("");
    setPhone("");
    setRole("");
    
    setFullName(employee.name);
    setDni(String(employee.dni));
    // setBirthDate(employee.birthdate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
    setPhone(String(employee.phone));
    setRole(employee.role);
    setModoActualizar(true);
    setEmpleadoSeleccionado(employee);
  };


  return (
    <>
      <div className=" mt-8 m-auto w-96 bg-white shadow rounded-lg p-6">
        <h4 className="text-xl font-semibold mb-4">Agregar Nuevo Empleado</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dni"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              DNI
            </label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.dni && (
              <p className="text-red-500 text-xs italic">{errors.dni}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="birthDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.birthdate && (
              <p className="text-red-500 text-xs italic">{errors.birthdate}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Celular
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Rol
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Limpieza">Limpieza</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs italic">{errors.role}</p>
            )}
          </div>

          { modoActualizar ? (
             <button
             type="submit"
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >Actualizar Empleado</button>

          ):(
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >Agregar Empleado</button>
          )}
        </form>
      </div>
      <EmployeeList onSelectEmployee={handleSelectEmployee} />
    </>
  );
}



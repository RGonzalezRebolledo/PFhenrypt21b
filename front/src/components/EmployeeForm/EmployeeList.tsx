'use client'
// ACTUAL
import { useState, useEffect } from 'react'

interface IEmployee {
  id: string;
  name: string;
  dni: number;
  birthdate: Date;
  phone: number;
  role: string;
  active: boolean;
}

interface EmployeeListProps {
  onSelectEmployee: (employee: IEmployee) => void; // Define la prop aquí
}


// ENDPOINT 
const APIURL = process.env.NEXT_PUBLIC_API_URL;
 const getEmployee = async () => {
  const response = await fetch(`${APIURL}/employee`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};


// const mockEmployees: IEmployee[] = [
//   { id: 1, name: 'Ana Martínez', dni:12, role:'Recepcionista', phone: 23432424, active: true },
//   { id: 2, name: 'Pedro Sánchez', dni:13, role: 'Mantenimiento', phone: 23432424, active: true },
//   { id: 3, name: 'Laura Rodríguez', dni:14, role: 'Limpieza', phone: 23432424, active: true },
//   { id: 4, name: 'Carlos Gómez', dni:15, role: 'Recepcionista', phone: 23432424, active: true },
//   { id: 5, name: 'María López', dni:16, role: 'Administrador', phone: 23432424, active: true },
// ]
const positions = ['Todos', 'Recepcionista', 'Mantenimiento', 'Limpieza', 'Administrador']

export default function EmployeeList({ onSelectEmployee }: EmployeeListProps) {
  const [nameFilter, setNameFilter] = useState('')
  const [positionFilter, setPositionFilter] = useState('Todos')
  // const [employees, setEmployees] = useState(getEmployee)
  const [employees, setEmployees] = useState<IEmployee[]>([]); // Inicializa como un array vacío

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployee();
      setEmployees(data);
    };

    fetchEmployees();

  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente
  console.log ("hola ramon", employees)

  const filteredEmployees = employees.filter(employee =>
    (positionFilter === 'Todos' || employee.role === positionFilter) &&
    (employee.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
     employee.role.toLowerCase().includes(nameFilter.toLowerCase()))
  )

  const handleDeactivate = (id: number) => {

    // AQUI EL ENDPOINT PARA DESACTIVARLO Y ACTIVARLOS

    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, active: !emp.active } : emp
    ))
   }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-xl font-semibold mb-4">Lista de Empleados</h4>
      <div className="mb-4">
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        >
          {positions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar empleados..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredEmployees.map(employee => (
          <li key={employee.id} className="py-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {employee.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {employee.role}
              </p>
            </div>
            <button 
           onClick={() => {
            // handleDeactivate(employee.id);
            onSelectEmployee(employee); // Llama a la función para seleccionar el empleado
            }}
             className="px-3 py-1 mr-4 rounded text-white text-sm bg-blue-500 hover:bg-blue-600">Editar</button>
            <button
              // onClick={() => handleDeactivate(employee.id)}
              className={`px-3 py-1 rounded text-white text-sm ${
                employee.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {employee.active ? 'Dar de Baja' : 'Reactivar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}


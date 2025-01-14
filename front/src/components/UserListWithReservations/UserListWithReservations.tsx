"use client";

import { clientDetailsAll, Client } from "@/api/clientDetails";
import React, { useState, useEffect } from "react";


const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");





  //////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await clientDetailsAll();
        setClients(data);
        setFilteredClients(data);
      } catch (error) {
        console.error("Error al obtener los detalles de los clientes:", error);
        setError("No se pudo cargar la información de los clientes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(lowerCaseSearch) ||
        client.email.toLowerCase().includes(lowerCaseSearch) ||
        client.phone.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  if (loading) {
    return <div>Cargando detalles de los clientes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredClients.length === 0) {
    return <div>No se encontró información de los clientes</div>;
  }

  return (

      <div className="shadow-md rounded-lg overflow-hidden mt-4">
        <h2 className="text-[2.5rem] font-semibold px-6 py-4 text-center">
          Historial de Clientes
        </h2>
        <div className="px-6 py-4">
          <input
            type="text"
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Buscar por nombre, correo o teléfono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredClients.map((client) => (
          <div key={client.id} className="px-6 py-4">
            <h3>
              <strong>Nombre:</strong> {client.name}
            </h3>
            <h3>
              <strong>Email:</strong> {client.email}
            </h3>
            <h3>
              <strong>Teléfono:</strong> {client.phone}
            </h3>
            <h3 className="text-[1.5rem] font-semibold px-6 py-4">
              Historial de Reservas
            </h3>
            {client.reservations && client.reservations.length === 0 ? (
              <p className="px-6 py-4">No hay reservas para este cliente.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-grisOscuro font-primary text-[1rem] font-medium uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-grisOscuro font-primary text-[1rem] font-medium uppercase tracking-wider">
                      Check-out
                    </th>
                    <th className="px-6 py-3 text-grisOscuro font-primary text-[1rem] font-medium uppercase tracking-wider">
                      Habitación
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {client.reservations &&
                    client.reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-grisClaro">
                          {new Date(
                            reservation.checkInDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-grisClaro">
                          {new Date(
                            reservation.checkOutDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-grisClaro">
                          {reservation.roomId}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>

  );
};

export default Clients;

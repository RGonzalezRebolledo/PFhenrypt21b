"use client";

import { useEffect, useState } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export default function ContadorVisitas() {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    const fetchTotalVisits = async () => {
      try {
        const response = await fetch(`${APIURL}/visits/total`);
        const data = await response.json();

        if (data && typeof data.total === "number") {
          setVisits(data.total);
        } else {
          console.error("Respuesta inesperada del backend:", data);
        }
      } catch (error) {
        console.error("Error al obtener el contador de visitas:", error);
      }
    };

    const getClientIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error("Error al obtener la IP del cliente:", error);
        return null;
      }
    };

    const hasVisitedRecently = async (ip: string) => {
      try {
        const response = await fetch(`${APIURL}/visits/recent?ip=${ip}`);
        const data = await response.json();
        return data.recent;
      } catch (error) {
        console.error("Error al verificar si el cliente ha visitado recientemente:", error);
        return false;
      }
    };

    const registerVisit = async (ip: string) => {
      try {
        const response = await fetch(`${APIURL}/visits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ip }),
        });

        if (!response.ok) {
          console.error("Error al registrar la visita en el backend");
        }
      } catch (error) {
        console.error("Error al intentar registrar la visita:", error);
      }
    };

    getClientIp().then((ip) => {
      if (ip) {
        hasVisitedRecently(ip).then((recent) => {
          if (!recent) {
            registerVisit(ip).then(fetchTotalVisits);
          } else {
            fetchTotalVisits();
          }
        });
        console.log(ip);
        
      } else {
        console.error("No se pudo obtener la IP del cliente");
      }
    });
  }, []);

  return (
    <div className="w-24 h-14 ml-5 bg-grisOscuro shadow-sm shadow-beige rounded-xl flex flex-col items-center justify-center p-2 drop-shadow-sm">
      <h1 className="text-medium font-semibold text-white drop-shadow-sm">
        Visitante
      </h1>
      <span className="text-white font-bold px-1 text-2xl drop-shadow-lg shadow-mostaza">
        N° {visits}
      </span>
    </div>
  );
}

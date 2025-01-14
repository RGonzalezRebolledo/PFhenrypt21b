"use client";
import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`absolute bg-grisOscuro text-white ${
        isExpanded ? "w-72" : "w-20"
      } h-auto p-4 transition-all duration-300`}
    >
      <div
        className={`font-bold text-grisClaro mb-4 transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <ul className="space-y-4">
        <li
          className="hover:text-mostaza cursor-pointer flex items-center"
          title="CLIENTES REGISTRADOS"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M9 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-6 2c-2.67 0-8 1.34-8 4v2h8v-2c0-.68.33-1.34.88-1.72C7.91 16.77 8.45 16 9 16c.55 0 1.09.77 1.12 1.28.55.38.88 1.03.88 1.72v2h8v-2c0-2.66-5.33-4-8-4zm9.78 2c-.53 0-1.04.23-1.41.63-.43.46-.75 1.13-.75 1.84h2.52v-2c0-.26-.1-.52-.36-.72zM12 18v-2c-.78-.61-1.75-1-3-1s-2.22.39-3 1v2h6z"
              fill="currentColor"
            />
          </svg>
          {isExpanded && (
            <Link href="/clientdetails">Clientes Registrados</Link>
          )}
        </li>
        <li
          className="hover:text-mostaza cursor-pointer flex items-center"
          title="HISTORIAL DE CLIENTES"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 3v18h18V3H3zm17 17H4V10h16v10zm0-11H4V4h16v5zM6 13h2v2H6v-2zm0 3h2v2H6v-2zm3-3h2v2H9v-2zm0 3h2v2H9v-2zm3-3h2v2h-2v-2zm0 3h2v2h-2v-2zm3-3h2v2h-2v-2zm0 3h2v2h-2v-2zm-9-6h2v2H6v-2zm3 0h2v2H9v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z" />
          </svg>
          {isExpanded && (
            <Link href="/clientlist" className="ml-4">
              Historial de Clientes
            </Link>
          )}
        </li>
        <li
          className="hover:text-mostaza cursor-pointer flex items-center"
          title="REGISTRAR CLIENTES"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2h36a4 4 0 014 4v52a4 4 0 01-4 4H12a4 4 0 01-4-4V6a4 4 0 014-4z"
              fill="#f5f5f5"
              stroke="#333"
            />
            <path
              d="M16 2v60M24 10h16M24 18h16M24 26h16M24 34h16M24 42h16M24 50h16"
              stroke="#333"
            />
            <path
              d="M6 10h4M6 18h4M6 26h4M6 34h4M6 42h4M6 50h4"
              stroke="#888"
            />
          </svg>
          {isExpanded && (
            <Link href="/register" className="ml-4">
              Registrar Clientes
            </Link>
          )}
        </li>
        <li
          className="hover:text-mostaza cursor-pointer flex items-center"
          title="REGISTRO DE HABITACIONES"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M6 2v20h12V2H6zm11 18h-2V4h2v16zm-4 0h-2V4h2v16zm-4 0H7V4h2v16z"
              fill="currentColor"
            />{" "}
            <path d="M6 2H4v20h2V2zm14 0h-2v20h2V2z" fill="currentColor" />
          </svg>
          {isExpanded && (
            <Link href="/roomsManagement" className="ml-4">
              Registro de Habitaciones
            </Link>
          )}
        </li>

        <li
          className="hover:text-mostaza cursor-pointer flex items-center"
          title="CREAR EMPLEADOS"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
          </svg>
          {isExpanded && (
            <Link href="/employee" className="ml-4">
              Crear Empleados
            </Link>
          )}
        </li>

        <li
          className="hover:text-mostaza cursor-pointer flex items-center"
          title="APROBAR TESTIMONIOS"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M10 10 H 190 V 140 H 10 Z"
              fill="#f0f0f0"
              stroke="#000"
              strokeWidth="2"
            />
            <path
              d="M10 10 Q 0 75 10 140"
              fill="none"
              stroke="#000"
              strokeWidth="2"
            />
          </svg>
          {isExpanded && (
            <Link href="/testimonialsadmin" className="ml-3">
              Aprobar Testimonios
            </Link>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

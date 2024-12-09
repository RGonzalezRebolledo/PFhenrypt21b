"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { userSession } from "@/interfaces/Types.session";
import CardUser from "./CardUser";
import { useLoggin } from "@/context/logginContext";
import Switcher from "../Switcher";
const Header = () => {
  const { userData, setUserData } = useLoggin();

  const router = useRouter();
  const path = usePathname();

  // const [userSession, setUserSession] = useState<userSession>();

  // useEffect(() => {
  //   const session = localStorage.getItem("userSesion");
  //   if (session) {
  //     setUserSession(JSON.parse(session));
  //   }
  // }, []);

  // useEffect(() => {
  //   const session = localStorage.getItem("userSesion");
  //   if (session) {
  //     setUserSession(JSON.parse(session));
  //   }
  // }, [path === "/"]);

  return (
    <header className="absolute w-full bg-black text-white shadow-md shadow-amber-600">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/HE.png"
              alt="Elysim"
              width={120}
              height={50}
              className="hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        <nav className="flex-grow">
          <div className="flex justify-center space-x-6">
            <Link href="/" className="hover:text-amber-600">
              Home
            </Link>
            <Link href="rooms" className="hover:text-amber-600">
              Habitaciones
            </Link>
            <Link href="facilities" className="hover:text-amber-600">
              Servicios
            </Link>
            <Link href="contact" className="hover:text-amber-600">
              Contacto
            </Link>
            <div>
              <Switcher/>
            </div>
          </div>
        </nav>

        <div className="flex space-x-4">
          {userData?.token ? (
            <>
              {/* <p>{`Usuario: ${userData?.userData.name}`}</p>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("sessionStart");
                  setUserSession(undefined);

                  localStorage.removeItem("cart");
                  setUserSession(undefined);
                  router.push("/");
                }}
              >
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => {
                  // Limpia el localStorage
                  localStorage.removeItem("sessionStart");

                  // Limpia el estado del contexto
                  setUserData(null);

                  // Redirige al usuario a la página de inicio
                  router.push("/");
                }}
              >
                Cerrar Sesión
              </button> */}

              <div className="flex px-6">
                <CardUser />
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-amber-600 text-white border border-amber-800 rounded-lg py-2 px-4 hover:bg-opacity-90">
                  Iniciar Sesión
                </button>
              </Link>

              <Link href="/register">
                <button className="bg-amber-600 text-white border border-amber-800 rounded-lg py-2 px-4 hover:bg-opacity-90">
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

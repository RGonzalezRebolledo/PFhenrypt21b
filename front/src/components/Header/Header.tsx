"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import CardUser from "./CardUser";
import { useLoggin } from "@/context/logginContext";
import Switcher from "../Switcher";

const Header = () => {
  const { userData} = useLoggin();
  return (
    <header className="fixed w-full bg-black text-white shadow-md shadow-marronclaro z-50">
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
            <Link href="/" className="hover:text-marronclaro">
              Home
            </Link>
            <Link href="/rooms" className="hover:text-marronclaro">
              Habitaciones
            </Link>
            <Link href="/facilities" className="hover:text-marronclaro">
              Servicios
            </Link>
            <Link href="/contact" className="hover:text-marronclaro">
              Contacto
            </Link>
            <div>
              <Switcher />
            </div>
          </div>
        </nav>

        <div className="flex space-x-4">
          {userData?.token ? (
            <>
              <div className="flex px-6">
                <CardUser  />
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-marron text-white border border-marronfuerte rounded-lg py-2 px-4 hover:bg-opacity-70">
                  Iniciar Sesión
                </button>
              </Link>

              <Link href="/register">
                <button className="bg-marron text-white border border-marronfuerte rounded-lg py-2 px-4 hover:bg-opacity-70">
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
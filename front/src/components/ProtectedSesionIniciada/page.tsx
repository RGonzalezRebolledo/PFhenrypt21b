"use client";

import { useLoggin } from "@/context/logginContext";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const RedirectHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userData, loadUserData } = useLoggin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!userData) {
        try {
          const data = await loadUserData();

          if (data) {
            if (data.userData.role.name === "Administrador") {
              if (pathname === "/login") {
                Swal.fire({
                  title: "Acceso Restringido",
                  html: "Ya tienes Sesion Iniciada <br> Por favor<br>Si va a iniciar como otro usario, por favor, Cierre Sesión.<br> De gual manera si vas a registrar otro usuario debes cerrar sesión.",
                  icon: "info",
                  confirmButtonText: "Ir al Inicio",
                }).then(() => {
                  setTimeout(() => {
                    router.push("/");
                  }, 0);
                });
              }
            } else {
              Swal.fire({
                title: "Ya tienes sesión iniciada",
                html: "Ya tienes Sesion Iniciada <br> Por favor<br>Si va a iniciar como otro usario, por favor, Cierre Sesión.<br> De gual manera si vas a registrar otro usuario debes cerrar sesión.",
                icon: "info",
                confirmButtonText: "Aceptar",
              }).then(() => {
                setTimeout(() => {
                  router.push("/");
                }, 0);
              });
            }
          }
        } catch (error) {
          console.error("Error al cargar los datos del usuario:", error);
          setTimeout(() => {
            router.push("/login");
          }, 0);
        }
      }
    };

    handleRedirect();
  }, [router, loadUserData, userData, pathname]);

  if (!userData && (pathname === "/login" || pathname === "/register")) {
    return <>{children}</>;
  }

  if (userData?.userData.role.name === "Administrador") {
    if (pathname === "/login") {
      setTimeout(() => {
        router.push("/");
      }, 0);
    }
    return <>{children}</>;
  }

  if (userData?.userData.role.name === "Cliente") {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-gray-500 text-3xl font-bold shadow-lg shadow-gray-500/50">
       Espere. Cargando...
      </div>
    </div>
  );
};

export default RedirectHandler;

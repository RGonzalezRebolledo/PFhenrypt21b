"use client";

import { useEffect, useState } from "react";
import { useLoggin } from "@/context/logginContext";
import { Testimonial } from "./Type.Testimonials";
import axios from "axios";
import SweetAlert from "sweetalert2";
import TestimonialCard from "./TestimonialCard";
import TestimonialModal from "./TestimonialModal";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    Testimonial[]
  >([]);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { userData } = useLoggin();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const token = userData?.token;
        if (!token) {
          throw new Error("Token de autenticación no disponible");
        }
        const response = await axios.get(`${APIURL}/testimonials`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTestimonials(response.data);
        setFilteredTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };
    fetchTestimonials();
  }, [userData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = testimonials.filter(
      (testimonial) =>
        testimonial.username.toLowerCase().includes(value.toLowerCase()) ||
        testimonial.email.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTestimonials(filtered);
  };

  const handleDelete = async (id: string) => {
    const result = await SweetAlert.fire({
      title: "¿Estás seguro?",
      text: "¡Este testimonio será eliminado permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "bg-mostaza text-white hover:bg-beige",
        cancelButton: "bg-red-500 text-white hover:bg-red-600",
      },
    });

    if (result.isConfirmed) {
      try {
        const token = userData?.token;

        if (!token) {
          throw new Error("Token de autenticación no disponible");
        }
        await axios.delete(`${APIURL}/testimonials/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setFilteredTestimonials((prev) => prev.filter((t) => t.id !== id));
        SweetAlert.fire(
          "¡Eliminado!",
          "El testimonio ha sido eliminado.",
          "success"
        );
      } catch (error) {
        console.log("Error deleting testimonial", error);

        SweetAlert.fire("Error", "No se pudo eliminar el testimonio.", "error");
      }
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const result = await SweetAlert.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas cambiar el Status a ${status}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, Cambiar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "bg-mostaza text-white hover:bg-beige",
        cancelButton: "bg-red-500 text-white hover:bg-red-600",
      },
    });
    if (result.isConfirmed) {
      try {
        const token = userData?.token;
        if (!token) {
          throw new Error("Token de autenticación no disponible");
        }
        await axios.patch(
          `${APIURL}/testimonials/${id}/status`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
        setFilteredTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
        SweetAlert.fire(
          "¡Cambiado!",
          `El estatus ha sido actualizado a ${status}.`,
          "success"
        );
      } catch (error) {
        console.log("Error changing status", error);

        SweetAlert.fire("Error", "No se pudo cambiar el estatus.", "error");
      }
    }
  };

  const openModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="p-4">
      <div className="container mx-auto pl-12">
        <h1 className="text-2xl font-bold mb-6">Testimonios de Clientes</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre o email"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>

        <div className="space-y-4">
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onDelete={handleDelete}
                onClick={openModal}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <p>No se encontraron testimonios.</p>
          )}
        </div>

        {modalVisible && selectedTestimonial && (
          <TestimonialModal
            testimonial={selectedTestimonial}
            onClose={closeModal}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;

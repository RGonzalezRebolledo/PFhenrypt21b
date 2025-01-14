"use client";

import { deleteReservation, getReservations } from "@/api/getReservations";
import { Reservation, Room } from "@/interfaces";
import { useState, useEffect } from "react";
import { useLoggin } from "@/context/logginContext";
import { PaymentButton } from "@/components/PaymentButton/PaymentButton";
import Swal from "sweetalert2"




const ReservationsPage = () => {
  const { userData } = useLoggin();
  const userId = userData?.userData.id;
  const token = userData?.token;

  const [reservations, setReservations] = useState<
    (Reservation & { room: Room | null })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !token) {
      console.error("No userId or token available in context.");
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        const fetchedReservations = await getReservations(userId, token);
        setReservations(fetchedReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const calculateTotal = (
    checkInDate: string | Date,
    checkOutDate: string | Date,
    price: number
  ) => {
    const checkIn =
      typeof checkInDate === "string" ? new Date(checkInDate) : checkInDate;
    const checkOut =
      typeof checkOutDate === "string" ? new Date(checkOutDate) : checkOutDate;
    const days = Math.max(
      1,
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days * price;
  };

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  const handleDelete = async (reservationId: string) => {
    const confirmed = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Cancelar Reserva",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'bg-mostaza text-white hover:bg-beige',
        cancelButton: 'bg-red-500 text-white hover:bg-red-600'
      }
    });

    if (!confirmed.isConfirmed) return;

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Token no disponible",
        text: "No se puede completar la acción.",
      });
      return;
    }

    try {
      await deleteReservation(reservationId, token);
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
      Swal.fire({
        icon: "success",
        title: "Cancelar Reservación",
        text: "La reservación ha sido eliminada exitosamente.",
      });
    } catch (error) {
      console.error("Error eliminando la reservación:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al eliminar la reservación.",
      });
    }
  };

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Mis Reservaciones</h1>
      {reservations.length === 0 ? (
        <p className="text-center">No reservations found.</p>
      ) : (
        <div className="space-y-6">
          {reservations.map((reservation: any) => {
            const total = reservation.room
              ? calculateTotal(
                  reservation.checkInDate,
                  reservation.checkOutDate,
                  reservation.room.price
                )
              : 0;

            const today = new Date();
            const checkInDate = new Date(reservation.checkInDate);
            const buttonLabel =
              checkInDate < today
                ? "Califica tu estadía"
                : reservation.paymentStatus === "Reserva no Pagada"
                ? "Pagar"
                : "Cancelar";

            return (
              <div
                key={reservation.id}
                className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {reservation.room?.image ? (
                  <img
                    src={reservation.room.image}
                    alt={reservation.room.title}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mr-4"
                  />
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 flex justify-center items-center rounded-lg mr-4">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1">
                    {reservation.room?.title || "Room not available"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Precio por noche:</strong> $
                    {reservation.room?.price?.toFixed(2) || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Check-in:</strong>{" "}
                    {new Date(reservation.checkInDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Check-out:</strong>{" "}
                    {new Date(reservation.checkOutDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong> {reservation.paymentStatus}
                  </p>
                </div>

                <div className="flex flex-col items-end ml-4 space-y-3">
                  <p className="text-lg font-medium text-gray-800">
                    <strong>Total:</strong> ${total.toFixed(2)}
                  </p>

                  {reservation.paymentStatus === "Reserva no Pagada" && (
                    <>
                
                    
                      <PaymentButton
                        amount={Number(total.toFixed(2))}
                        currency="usd"
                        description={reservation.room?.title}
                        id={reservation.id}
                      />

                      <button
                        className="px-4 py-2 text-white font-semibold rounded-md bg-mostaza hover:bg-grisclaro transition-colors"
                        onClick={() => handleDelete(reservation.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  )}

                  
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;

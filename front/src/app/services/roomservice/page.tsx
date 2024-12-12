import ServiceComponent from "@/components/ServiceComponent/ServiceComponent";

const roomserviceData = {
  name: "Servicio de Habitación",
  referencia: "Servicio de Atención a la Habitación",
  photos: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
  comments: [
    {
      photo: "/persona1.jpg",
      comment: "Bebidas y platos en la comodidad de tu habitación.",
    },
    {
      photo: "/persona2.jpg",
      comment: "Disponible las 24 horas para tu conveniencia.",
    },
    {
      photo: "/persona3.jpg",
      comment: "Los mejores vinos y platos para nuestros clientes.",
    },
  ],
};

const GymPage = () => {
  return <ServiceComponent serviceDataItem={roomserviceData} />;
};

export default GymPage;

import ServiceComponent from "@/components/ServiceComponent/ServiceComponent";

const spaData = {
  name: "Spa",
  referencia: "Servicio de Spa",
  photos: ["/spa1.jpg", "/spa2.jpg", "/spa3.jpg"],
  comments: [
    {
      photo: "/persona1.jpg",
      comment: "Renuévate con nuestros tratamientos de spa.",
    },
    {
      photo: "/persona2.jpg",
      comment: "Relájate en un ambiente de tranquilidad.",
    },
    {
      photo: "/persona3.jpg",
      comment: "Descubre el lujo y el confort en cada detalle.",
    },
  ],
};

const GymPage = () => {
  return <ServiceComponent serviceDataItem={spaData} />;
};

export default GymPage;

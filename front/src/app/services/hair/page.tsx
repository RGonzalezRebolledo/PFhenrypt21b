import ServiceComponent from "@/components/ServiceComponent/ServiceComponent";

const hairData = {
  name: "Peluquería",
  referencia: "Servicio Profesional de Peluqueria",
  photos: ["/hair1.jpg", "/hair2.jpg", "/hair3.jpg"],
  comments: [
    { photo: "/persona1.jpg", comment: "Atención profesional con los mejores tratamientos" },
    { photo: "/persona2.jpg", comment: "A toda hora nuestros los mejores cortes y tratamientos" },
    { photo: "/persona3.jpg", comment: "Impacta con los peinados modernos para todos" },
  ],
};

const GymPage = () => {
  return <ServiceComponent serviceDataItem={hairData} />;
};

export default GymPage;

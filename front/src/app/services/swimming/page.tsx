import ServiceComponent from "@/components/ServiceComponent/ServiceComponent";

const swimmingData = {
  name: "Piscina",
  referencia: "Servicio de Piscina",
  photos: ["/pool1.jpeg", "/pool2.jpeg", "/pool3.jpeg"],
  comments: [
    {
      photo: "/persona1.jpg",
      comment: "Equipamiento moderno para tu disfrute.",
    },
    {
      photo: "/persona2.jpg",
      comment: "Abierta las 24 horas para tu familia y amigos.",
    },
    {
      photo: "/persona3.jpg",
      comment: "Disfruta y relájate en las mejores piscinas.",
    },
  ],
};

const GymPage = () => {
  return <ServiceComponent serviceDataItem={swimmingData} />;
};

export default GymPage;

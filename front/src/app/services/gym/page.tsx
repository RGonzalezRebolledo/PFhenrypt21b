import ServiceComponent from "@/components/ServiceComponent/ServiceComponent";

const gymData = {
  name: "Gimnasio",
  referencia: "Servicio de Gimnasio",
  photos: ["/gym1.jpeg", "/gym2.jpeg", "/gym3.jpeg"],
  comments: [
    {
      photo: "/persona1.jpg",
      comment: "Equipamiento moderno para tu entrenamiento.",
    },
    {
      photo: "/persona2.jpg",
      comment: "Abierto las 24 horas para tu conveniencia.",
    },
    { photo: "/persona3.jpg", comment: "Entrena con vistas relajantes." },
  ],
};

const GymPage = () => {
  return <ServiceComponent serviceDataItem={gymData} />;
};

export default GymPage;

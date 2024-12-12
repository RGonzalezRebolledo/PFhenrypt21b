import ServiceComponent from "@/components/ServiceComponent/ServiceComponent";

const breakfastData = {
  name: "Desayuno Buffet",
  referencia: "Servicio de Desayuno Buffet",
  photos: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
  comments: [
    {
      photo: "/persona1.jpg",
      comment: "Disfruta de un desayuno delicioso y variado.",
    },
    {
      photo: "/persona2.jpg",
      comment: "Productos frescos y de calidad para empezar tu día.",
    },
    {
      photo: "/persona3.jpg",
      comment: "Opciones para todos los gustos y preferencias.",
    },
  ],
};

const BreakfastPage = () => {
  return <ServiceComponent serviceDataItem={breakfastData} />;
};

export default BreakfastPage;

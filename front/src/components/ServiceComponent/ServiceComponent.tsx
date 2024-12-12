import Image from "next/image";

type ServiceProps = {
  name: string;
  referencia: string;
  photos: string[];
  comments: { photo: string; comment: string }[];
};

interface PageProps {
  serviceDataItem: ServiceProps;
}

const ServiceComponent = ({ serviceDataItem }: PageProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-6xl font-extrabold mb-12 text-center bg-gradient-to-r text-titulo bg-clip-text">
          {serviceDataItem.referencia}
        </h2>

        <div className="space-y-12">
          {serviceDataItem.photos.map((photo, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              } items-center gap-8 relative`}
            >
              <div
                className={`absolute ${
                  index % 2 === 0 ? "left-20 top-1 bottom-4" : "right-10 top-1 bottom-4"
                } z-1`}
              >
                <Image
                  src={serviceDataItem.comments[index].photo}
                  alt={`Persona ${index + 1} Apuntando al Comentario`}
                  width={320}
                  height={320}
                />
              </div>

              <div className="p-4 bg-white text-black rounded-lg shadow-lg border-4 border-marronclaro order-1 lg:order-2">
                <p className="text-lg">{serviceDataItem.comments[index].comment}</p>
              </div>

              <div
                className="rounded-lg shadow-lg border-4 border-marronclaro order-2 lg:order-1"
                style={{ width: "400px", height: "400px" }}
              >
                <Image
                  src={photo}
                  alt={`${serviceDataItem.name} Foto ${index + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceComponent;

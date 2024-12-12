import Image from 'next/image';

const FeatureSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* Imagen centrada */}
        <div className="flex justify-center">
          <Image 
            src="/habitacion.png" 
            alt="Habitación de lujo" 
            className="rounded-lg shadow-lg shadow-marronclaro" 
            width={400} 
            height={200} 
          />
        </div>
        

        <div>
          <h2 className="text-3xl font-bold mb-4">El Mejor Hotel en la Ciudad de California</h2>
          <p className="text-gray-700 mb-6">
            Alojate y Volveras. La mejor Experiencia
          </p>

          <ul className="flex space-x-1"> 
            <li className='flex flex-wrap'>
              <h4 className="font-primary text-mostaza text-[4rem]">250</h4>
              <span className='font-secondary text-mostaza text-[3rem] font-bold'>+</span> 
              <p>Habitaciones de Lujo</p>
            </li>
            <li>
              <span className="font-secondary text-marron text-[3rem] ml-5">4.9</span> Calificación de los Clientes
            </li>
          </ul>

          <hr className="border-t-2 border-marron my-4" />
          <button className="bg-marron text-white border border-marron rounded-lg py-2 px-4 hover:bg-opacity-70">Más información</button>
        </div>
        
      </div>
    </section>
  );
};

export default FeatureSection;

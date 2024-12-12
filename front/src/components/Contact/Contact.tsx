import Image from 'next/image';

const ContactForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-[80px]">
      <div className="flex flex-col lg:flex-row bg-gray-100 p-4 rounded-lg space-y-8 lg:space-y-0 lg:space-x-8 max-w-4xl">
        <div className="flex-1 max-w-md">
          <h2 className="text-2xl font-bold mb-4">CONTACTENOS</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste itaque eius minus numquam ea! Adipisci, quis explicabo. Nostrum pariatur omnis,
            voluptas mollitia suscipit aut quibusdam distinctio modi atque, ipsum accusamus.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Image src="/phone.svg" alt="Teléfono" width={24} height={24} />
              <span className="ml-4 text-gray-800">555 123 456789</span>
            </div>
            <div className="flex items-center">
              <Image src="/email.svg" alt="Correo electrónico" width={24} height={24} />
              <span className="ml-4 text-gray-800">example@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Image src="/direccion.svg" alt="Dirección" width={24} height={24} />
              <span className="ml-4 text-gray-800">Calle falsa 123, Nº 789</span>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-md bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">CONSULTANOS</h2> 
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nombre Completo"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-marronclaro focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-marronclaro focus:outline-none"
              required
            />
            <textarea
              placeholder="Escribir mensaje"
              rows={5}
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-marronclaro focus:outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-marronclaro text-white font-semibold p-3 rounded-lg hover:bg-marronclaro transition duration-300"
            >
              ENVIAR MENSAJE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;


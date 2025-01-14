'use client';

import Image from 'next/image';
import gymPortada from '../../../public/gym2.jpeg'
import gymIMG from '../../../public/gym1.jpeg'
import Style from '../FacilitiesComponent/facilities.module.css'
import Styles from '../DetailsFacilities/detailsStyles.module.css'

import Link from 'next/link';
import { useState } from 'react';
import menuStyle from './subDetails.module.css';

export const GymComponent = () => {
  const [categoriaActiva] = useState<"principal">("principal");
  const menu = {
    principal: [
      { 
        id: 1, 
        nombre: "Área de Cardio", 
        descripcion: "Equipos de última tecnología para entrenamientos cardiovasculares. Incluye bicicletas estáticas, caminadoras y elípticas.",
        img: "https://lbeaute.mx/wp-content/uploads/2023/07/WhatsApp-Image-2023-07-18-at-18.12.13-1.jpg" 
      },
      { 
        id: 2, 
        nombre: "Sala de Pesas", 
        descripcion: "Zona dedicada al levantamiento de pesas, con una variedad de mancuernas, barras y máquinas de resistencia.",
        img: "https://www.entrenadorwellness.com/wp-content/uploads/2019/10/Gimnasio-tradicional-no-recomdanble.jpg" 
      },
      { 
        id: 3, 
        nombre: "Espacio de Entrenamiento Funcional", 
        descripcion: "Espacio tranquilo para realizar ejercicios de estiramiento y relajación, con colchonetas y accesorios disponibles.",
        img: "https://mercadofitness.com/wp-content/uploads/2019/11/Grow-Performance-lanza-franquicias-en-Espana.jpg" 
      },
      { 
        id: 4, 
        nombre: "Clases Grupales", 
        descripcion: "Ofrecemos clases de yoga, pilates, y entrenamiento funcional con instructores capacitados.",
        img: "https://www.tiendacompensar.com/ccstore/v1/images/?source=/file/v6895638630724090381/products/tres-mujeres-y-un-hombre-haciendo-ejercicio-en-un-salon-con-espejos.jpg" 
      }
    ]
  };
  return (
    <section className={Styles.container}>
      <button className={Styles.volver}><Link href='facilities'>VOLVER</Link></button>
      <div className={Styles.portadaGym}>
          <h1>GIMNASIO</h1>
          <h2>ENTRENA CON NOSOTROS EN NUESTRAS INSTALACIONES EXCLUSIVAS</h2>
      </div>

      <article className={Style.article0Container}>
          <h2>GIMNASIO</h2>
          <h1>ENTRENA EN NUESTRO GIMNASIO COMPLETO</h1>
      </article>
      
      {/*Gimnasio de entrenamiento*/}
      <article className={Styles.gimnasioContainer}>
          <Image src={gymPortada} width={780} height={755} alt='Gimnasio' loading="lazy"/>

          <div className={Styles.containerGim}>
              <Image src={gymIMG} width={780} height={955} alt='Gimnasio' loading="lazy"/>
              <p>Nuestro gimnasio está equipado con máquinas de última tecnología y zonas de descanso para que puedas disfrutar de tu entrenamiento.</p>
          </div>
      </article>

      {/*Clases y entrenamientos*/}
      <article className={Styles.alimentosContainer}>
          <h2 className={Styles.subTitulos}>CLASES GRUPALES</h2>
          <h1>ENTRENA EN GRUPO O INDIVIDUALMENTE</h1>
          <p className={Styles.detalles}>
            Ofrecemos clases de yoga, pilates, spinning y mucho más. Nuestros entrenadores están capacitados para guiarte en cada paso, asegurando que alcances tus objetivos de forma efectiva y segura.
          </p>

          <h1>REGLAS DEL GIMNASIO</h1>
          <p className={Styles.detalles}>
            Para asegurar una experiencia de entrenamiento segura y agradable para todos nuestros huéspedes, te pedimos que sigas estas simples reglas:
          </p>

          <p className={Styles.detalles}>1- Uso obligatorio de ropa deportiva adecuada. No se permite el ingreso al gimnasio sin ella.</p>
          <p className={Styles.detalles}>2- Respeta las normas de uso de las máquinas y equipos.</p>
          <p className={Styles.detalles}>3- Mantén el área limpia y ordenada después de usar los equipos.</p>
          <p className={Styles.detalles}>4- Los niños menores de 12 años deben estar acompañados por un adulto en la zona de entrenamiento.</p>
          <p className={Styles.detalles}>5- Hidrátate adecuadamente durante y después del entrenamiento.</p>

          <h1>CÓDIGO DE VESTIMENTA</h1>
          <p className={Styles.detalles}>
            El código de vestimenta en el gimnasio es sencillo pero necesario para mantener un ambiente cómodo para todos los usuarios:
          </p>

          <p className={Styles.detalles}>
            Ropa deportiva adecuada para entrenar y calzado cómodo.
          </p>

          <p className={Styles.detalles}>
            Toallas y agua disponibles a solicitud en el área.
          </p>

          <p className={Styles.detalles}>
            Uso de protección solar recomendado si entrenas al aire libre.
          </p>
      </article>

      <hr className={Styles.hr}/>
      
      {/*Detalles del menú*/}
      <article className={menuStyle.menuDetails}>
      <div className={menuStyle.submMenuDetails}>
      <h1>Zonas y Equipos Disponibles </h1>

      </div>

    <div className={menuStyle.cardContainer}>
      {menu[categoriaActiva].map((plato) => (
        <div key={plato.id} className={menuStyle.cards}>
            <Image src={plato.img} alt={plato.nombre} width={300} height={200} loading="lazy"/>
            <div className={menuStyle.cardsDescription}>
                <h3>{plato.nombre}</h3>
                <p>{plato.descripcion}</p>
            </div>
    </div>
  ))}
      </div>
        </article>
    </section>
  );
};

export default GymComponent;

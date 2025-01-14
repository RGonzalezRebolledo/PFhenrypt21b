'use client';

import Image from 'next/image';
import gymPortada from '../../../public/spa1.jpg'
import gymIMG from '../../../public/spa2.jpg'
import Style from '../FacilitiesComponent/facilities.module.css'
import Styles from '../DetailsFacilities/detailsStyles.module.css'

import Link from 'next/link';
import { useState } from 'react';
import menuStyle from './subDetails.module.css';

export const SpaComponent = () => {
  const [categoriaActiva] = useState<"principal">("principal");
  const menu = {
    principal: [
        { 
          id: 1, 
          nombre: "Área de Relajación", 
          descripcion: "Espacio dedicado al descanso con cómodos sillones y un ambiente relajante para desconectar del estrés.",
          img: "https://www.discoverpuertorico.com/sites/default/files/styles/horizontal_narrow_800x600/public/2019-02/spa-botanico-ritz-carlton-dorado-beach.jpg?h=5a344291&itok=87xtmAqo" 
        },
        { 
          id: 2, 
          nombre: "Sauna", 
          descripcion: "Relájate en nuestro sauna de alta calidad, ideal para aliviar tensiones musculares y mejorar la circulación.",
          img: "https://www.sporthotel-panorama.com/images/content/1321056_83431_3_C_800_600_0_480961726/dsc7801-min.jpg" 
        },
        { 
          id: 3, 
          nombre: "Masajes", 
          descripcion: "Ofrecemos una variedad de masajes terapéuticos, desde relajantes hasta descontracturantes, realizados por profesionales capacitados.",
          img: "https://almayun.cl/cdn/shop/products/10000022167761515085888.jpg?v=1669517813" 
        },
        { 
          id: 4, 
          nombre: "Baños de Vapor", 
          descripcion: "Disfruta de los beneficios de los baños de vapor, perfectos para limpiar la piel y mejorar la respiración.",
          img: "https://www.expobeautymagazine.com/uploads/fotos_noticias/2015/02/w800px_8803-65705.jpg" 
        }
      ]
  };
  return (
    <section className={Styles.container}>
      <button className={Styles.volver}><Link href='facilities'>VOLVER</Link></button>
      <div className={Styles.portadaSpa}>
          <h1>SPA Y ZONA DE RELAJACIÓN</h1>
          <h2>DISFRUTA DE UN MOMENTO DE PAZ EN NUESTRO SPA EXCLUSIVO</h2>
      </div>

      <article className={Style.article0Container}>
          <h2>SPA Y RELAX</h2>
          <h1>RELÁJATE EN NUESTRO EXCLUSIVO SPA</h1>
      </article>
      
       {/*Spa de relajación*/}
      <article className={Styles.gimnasioContainer}>
          <Image src={gymPortada} width={780} height={755} alt='Gimnasio' loading="lazy"/>

          <div className={Styles.containerGim}>
              <Image src={gymIMG} width={780} height={955} alt='Gimnasio' loading="lazy"/>
              <p>En nuestro spa encontrarás espacios diseñados para ofrecerte total tranquilidad y relajación, con una 
                variedad de servicios para rejuvenecer tu cuerpo y mente.</p>
          </div>
      </article>

      {/*Sala de estar*/}
      <article className={Styles.alimentosContainer}>
          <h2 className={Styles.subTitulos}>SALA DE ESTAR</h2>
          <h1>DISFRUTA DE UN ESPACIO CÓMODO Y ACOGEDOR</h1>
          <p className={Styles.detalles}>
          Nuestra sala de estar está pensada para ofrecerte un ambiente relajado donde puedas 
          disfrutar de un buen libro, tomar una bebida o simplemente descansar mientras disfrutas del confort de nuestras instalaciones.
          </p>

          <h1>REGLAS DE USO DEL SPA</h1>
          <p className={Styles.detalles}>
          Para asegurar que todos nuestros visitantes tengan la mejor experiencia, te pedimos que sigas las siguientes reglas:
          </p>

          <p className={Styles.detalles}>1- Es obligatorio el uso de ropa adecuada para el spa, como batas y sandalias.</p>
          <p className={Styles.detalles}>2- Los dispositivos electrónicos deben permanecer apagados para preservar la tranquilidad del lugar.</p>
          <p className={Styles.detalles}>3- Mantén el área limpia y ordenada después de usarla.</p>
          <p className={Styles.detalles}>4- Respeta los tiempos establecidos para cada servicio.</p>
          <p className={Styles.detalles}>5- No está permitido el uso del spa si se tiene algún problema de salud sin haber consultado previamente con un médico.</p>

          <h1>CÓDIGO DE CONDUCTA</h1>
          <p className={Styles.detalles}>
          El código de conducta dentro del spa es necesario para asegurar una atmósfera relajante para todos los usuarios:
          </p>

          <p className={Styles.detalles}>
          Respeto por los demás, tranquilidad y un comportamiento adecuado en todo momento.
          </p>

          <p className={Styles.detalles}>
          Las áreas de descanso están diseñadas para el confort de todos, por lo que pedimos mantener un volumen bajo en las conversaciones.
          </p>
      </article>

      <hr className={Styles.hr}/>
      
      {/*Detalles del menú*/}
      <article className={menuStyle.menuDetails}>
      <div className={menuStyle.submMenuDetails}>
      <h1>Servicios Disponibles</h1>

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

export default SpaComponent;

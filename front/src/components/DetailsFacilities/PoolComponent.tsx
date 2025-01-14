'use client';

import Style from '../FacilitiesComponent/facilities.module.css'
import Styles from '../DetailsFacilities/detailsStyles.module.css'
import menuStyle from './subDetails.module.css';
import Image from 'next/image';
import restaurantIMG from '../../../public/saul/piscina-detail.jpg';
import restaurantIMG2 from '../../../public/saul/piscina-detail-2.jpg';
import Link from 'next/link';
import { useState } from 'react';

export const PoolComponent = () => {
    const [categoriaActiva, setCategoriaActiva] = useState<"principal" | "bebidas">("principal");
    const menu = {
      principal: [
            { 
              id: 1, 
              nombre: "Piscina Familiar con Zona de Juegos ", 
              descripcion: "Área de juegos acuáticos supervisada por personal capacitado. Tumbonas familiares y sombrillas grandes.",
              img: "https://www.camping-beaurivage.fr/wp-content/themes/yootheme/cache/0c/193-Camping-Occitanie-Beau-Rivage-Ciela-Village-Parc-Aquatique-1-0c483d68.jpeg" 
            },
            { 
              id: 2, 
              nombre: "Piscina de Relajación para Adultos ", 
              descripcion: "Un área exclusiva para adultos donde el ambiente es tranquilo y sofisticado.",
              img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/d1/29/03/caption.jpg?w=800&h=600&s=1" 
            },
            { 
              id: 3, 
              nombre: "Piscina Infinity con Vista Panorámica ", 
              descripcion: "Servicio de fotografía profesional para capturar momentos inolvidables. Tumbonas sumergidas para una experiencia única.",
              img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/d1/22/07/caption.jpg?w=800&h=-1&s=1" 
            },
            { 
              id: 4, 
              nombre: "Piscina de Actividades y Entretenimiento ", 
              descripcion: "Clases de aqua zumba, voleibol acuático y competencias recreativas. Equipo de animación y actividades para todas las edades. Servicio de bebidas y snacks al área de la piscina.",
              img: "https://files-colreservas.s3.sa-east-1.amazonaws.com/photos/LXL6mSSpxsHBZFpmYLuPuTkcnL1rM4hjSUZkR8AL.jpg" 
            }
          ],
//ALMUERZO
bebidas: [
        { 
          id: 1, 
          nombre: "Bebidas y Cócteles Refrescantes ", 
          descripcion: "Disfruta del sol y la diversión mientras saboreas nuestras bebidas refrescantes y jugos naturales en el bar junto a la piscina.  ",
          img: "https://regionalizacion.uned.ac.cr/destinobrunca/catalog-api/storage/app/public//items/Perez_Zeledon/bar-restaurante-y-piscina-los-delfines/image157.jpg" 
        },
        { 
          id: 2, 
          nombre: "Cócteles Clásicos y Tropicales ", 
          descripcion: " Piña Colada, Mojito Tropical , Daiquiri de Fresa , Margarita de Mango,  Caipirinha",
          img: "https://elcoctelero.com/wp-content/uploads/2020/09/coctel-nueva-ola-ok.jpg" 
        },
        { 
          id: 3, 
          nombre: "Jugos Naturales y Bebidas para Niños ", 
          descripcion: "Jugo de Naranja Fresca,  Limonada Tropical,  Smoothie de Frutas, Jugo de Sandía ",
          img: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/07/07/15941217762783.jpg" 
        },
        { 
          id: 4, 
          nombre: "Whisky al Aire Libre ", 
          descripcion: "whiskies premium cuidadosamente elegidos para satisfacer los paladares más exigentes. Un toque de lujo y sofisticación en un entorno relajado ",
          img: "https://thumbs.dreamstime.com/b/budva-montenegro-de-junio-bar-con-alcohol-en-una-fiesta-al-aire-libre-verano-soleado-botella-vino-y-whisky-sobre-mesa-madera-fondo-279323809.jpg" 
        }
      ],
    };
    return (
        <section className={Styles.container}>
            <button className={Styles.volver}><Link href='facilities'>VOLVER</Link></button>
        <div className={Styles.portadaPiscina}>
            <h1>PISCINA</h1>
            <h2>RELAX Y DIVERSIÓN EN NUESTRA PISCINA</h2>
        </div>

        <article className={Style.article0Container}>
            <h2>PISCINAs</h2>
            <h1>DISFRUTA DE NUESTRAS EXCLUSIVAS INSTALACIONES ACUÁTICAS</h1>
        </article>
{/*Gimnasio de entrenamiento*/}
        <article className={Styles.gimnasioContainer}>
            <Image src={restaurantIMG} width={780} height={755} alt='Gimnasio' loading="lazy"/>

            <div className={Styles.containerGim}>
            <Image src={restaurantIMG2} width={780} height={955} alt='Gimnasio' loading="lazy"/>
            <p>Las piscina estan equipadas con zonas de descanso y camastros para que disfrutes del sol de manera segura.</p>
            </div>
        </article>

        {/*Alimentos*/}
        <article className={Styles.alimentosContainer}>
            <h2 className={Styles.subTitulos}>NIVELES</h2>
            <h1>PISCINAS CON VARIOS NIVELES</h1>
            <p className={Styles.detalles}>
            Sumérgete en la comodidad y tranquilidad de nuestra piscina de varios niveles, diseñada para ofrecerte una experiencia única
            . Con áreas especialmente pensadas tanto para adultos como para niños, podrás disfrutar de un ambiente seguro y relajante,
             adaptado a todas las edades. Desde la zona de profundidades más suaves ideales para los más pequeños, hasta el nivel más 
             profundo para aquellos que buscan nadar y relajarse en sus aguas cristalinas, nuestra piscina es el lugar perfecto para disfrutar de un día en el agua.

La piscina está rodeada por un paisaje impresionante que ofrece vistas panorámicas de la naturaleza circundante, creando un ambiente 

perfecto para relajarte bajo el sol. Además, nuestras tumbonas cómodas y espaciosas están dispuestas en áreas estratégicas para que 
puedas disfrutar del sol mientras tomas un refresco, leyendo un libro o simplemente contemplando las vistas.

Ya sea que busques un lugar para disfrutar de la paz y la relajación o prefieras pasar un rato de diversión en familia, nuestra 
piscina se adapta a tus necesidades, brindándote lo mejor de ambos mundos. Con un ambiente sereno para desconectar del estrés y 
opciones de actividades acuáticas para mantenerte activo, es el espacio perfecto para liberarte de la rutina.

¡Disfruta del lujo de nuestra piscina y crea recuerdos inolvidables!.
             </p>

             <h1>REGLAS DE LA PISCINAS</h1>
            <p className={Styles.detalles}>
            Para asegurar una experiencia agradable y segura para todos nuestros huéspedes, te pedimos que sigas estas simples reglas:
             </p>
            
                <p className={Styles.detalles}>1- Uso obligatorio de traje de baño adecuado. No se permite el ingreso a la piscina sin él.</p>
                <p className={Styles.detalles}>2- No correr ni realizar actividades peligrosas cerca de la piscina.</p>
                <p className={Styles.detalles}>3- Niños menores de 12 años deben estar acompañados por un adulto en todo momento.</p>
                <p className={Styles.detalles}>4- No se permiten animales dentro del área de la piscina.</p>
                <p className={Styles.detalles}>5- Uso responsable de las tumbonas y sillas. Por favor, no ocupes más de una tumbona si no la estás utilizando.</p>


             <h1>CÓDIGO DE VESTIMENTA</h1>
            <p className={Styles.detalles}>
            Nuestro código de vestimenta en la piscina es sencillo, pero fundamental para mantener un ambiente cómodo para todos los huéspedes:
             </p>

             <p className={Styles.detalles}>
             Traje de baño adecuado para adultos y niños.
             </p>

             <p className={Styles.detalles}>
             Toallas y sombrillas disponibles a solicitud en el área.
             </p>

             <p className={Styles.detalles}>
             Uso de protector solar recomendado.
             </p>
            </article>
        <hr className={Styles.hr}/>
          {/*Restaurante detalles*/}
          <article className={menuStyle.menuDetails}>
      <div className={menuStyle.submMenuDetails}>
      <h1>Más detalles de nuestras piscinas</h1>
        <button
          onClick={() => setCategoriaActiva("principal")}
          className={categoriaActiva === "principal" ? "activo" : ""}
        >
          Principal
        </button>
        <button
          onClick={() => setCategoriaActiva("bebidas")}
          className={categoriaActiva === "bebidas" ? "activo" : ""}
        >
          Bebidas
        </button>

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

export default PoolComponent;
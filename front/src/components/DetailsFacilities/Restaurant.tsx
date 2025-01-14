'use client';
import Style from '../FacilitiesComponent/facilities.module.css'
import Styles from '../DetailsFacilities/detailsStyles.module.css'
import Image from 'next/image';
import restaurantIMG from '../../../public/saul/instalaciones-restaurante-prueba.jpg';
import DesayunoMenu from './MenuRestaurant/DesayunoMenu';
import AlmuerzoMenu from './MenuRestaurant/AlmuerzoMenu';
import CenaMenu from './MenuRestaurant/CenaMenu';
import ModalReusable from '../Modals/ModalReusable';
import { useModal } from '@/hooks/useModal';

import Link from 'next/link';
import { useState } from 'react';
import menuStyle from './subDetails.module.css';

export const RestaurantComponent = () => {
    const [categoriaActiva, setCategoriaActiva] = useState<"desayuno" | "almuerzo" | "cena">("desayuno");
      const [isOpenModal, openModals, closeModals] = useModal(false);

    const menu = {
        desayuno: [
            { 
              id: 1, 
              nombre: "Desayuno Continental", 
              descripcion: "Panecillos frescos, Café, té y jugos naturales, Embutidos, Frutas frescas, Yogur y granola",
              img: "https://www.hotel-alfa.de/wp-content/uploads/sites/19/2016/04/Fruehstueck01.jpg" 
            },
            { 
              id: 2, 
              nombre: "Desayuno Americano", 
              descripcion: "Huevos revueltos o al gusto, Pancakes o waffles, Patatas fritas, Tostadas integrales o de pan de molde, Café, té y jugos naturales",
              img: "https://media.istockphoto.com/id/1126089794/es/foto/saludable-desayuno-americano-con-huevos-bacon-tortitas-y-latkes.jpg?s=612x612&w=0&k=20&c=IiwDQ0sMSsE0Uk5KzDAA3xJKyKSR0fxpNm2fv2Rrbvs=" 
            },
            { 
              id: 3, 
              nombre: "Desayuno Saludable", 
              descripcion: "Avena, Tostadas de aguacate, Smoothie bowl, Ensalada de frutas, Jugos naturales detox",
              img: "https://media-cdn.tripadvisor.com/media/photo-s/19/8c/a3/39/zumo-de-naranjas-huevo.jpg" 
            },
            { 
              id: 4, 
              nombre: "Desayuno Internacional", 
              descripcion: "Dim sum, Pita con hummus y tabulé, Croissants y panes con mermeladas artesanales, Frutas tropicales, Café expreso o té verde",
              img: "https://i.blogs.es/41884d/desayuno_continental/1366_2000.jpg" 
            }
          ],
//ALMUERZO
      almuerzo: [
        { 
          id: 1, 
          nombre: "Almuerzo mediterráneo", 
          descripcion: "Ensalada Caprese con tomate fresco, Filete de salmón a la plancha con hierbas provenzales",
          img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/537802258.jpg?k=b3b69c041a2a06723d22658eebde1ec125b26ca57b6da8791fa11e2b2debe75f&o=&hp=1" 
        },
        { 
          id: 2, 
          nombre: "Almuerzo Caribeño", 
          descripcion: "Ceviche de camarones con mango, cebolla morada y aguacate, acompañado de chips de plátano, Pollo al curry con coco, servido con arroz blanco y ensalada fresca de repollo y zanahoria",
          img: "https://www.brasileiraspelomundo.com/wp-content/uploads/2019/06/bandeja.jpg" 
        },
        { 
          id: 3, 
          nombre: "Almuerzo Gourmet Internacional:", 
          descripcion: "Solomillo de ternera en salsa de vino tinto, acompañado de puré de papas trufado y verduras asadas, Carpaccio de res con rúcula, queso parmesano y un toque de limón",
          img: "https://images.ecestaticos.com/PIN1EVz_brWM3r3uBkfQNsz0-4E=/75x3:961x667/1200x899/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F5b9%2Fbcb%2F998%2F5b9bcb998350cf79ab004d8708c277c3.jpg" 
        },
        { 
          id: 4, 
          nombre: "Almuerzo Ligero y Saludable", 
          descripcion: "Pechuga de pollo a la plancha con especias, servida con una ensalada fresca de espinaca, fresas, nueces y aderezo balsámico",
          img: "https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2024/10/recetas-de-cenas-ligeras.jpg" 
        }
      ],
      //CENA
      cena: [
        { 
          id: 1, 
          nombre: "Cena Internacional Buffet", 
          descripcion: "Filete de res en salsa de vino tinto.Salmón al horno con costra de hierbas. Estación de pastas al gusto con diferentes salsas",
          img: "https://www.tabiulala.com/wp/wp-content/uploads/2024/12/1378-2-960x640.jpg" 
        },
        { 
          id: 2, 
          nombre: "Cena Romántica en la Playa", 
          descripcion: "Langosta a la mantequilla de ajo con puré de papa trufado. Rib eye a la parrilla con vegetales al vapor.",
          img: "https://s0.smartresize.com/wallpaper/409/509/HD-wallpaper-romantic-beach-dinner-dinner-beach-nature-romantic.jpg" 
        },
        { 
          id: 3, 
          nombre: "Cena Temática Mexicana", 
          descripcion: "Filete mignon con reducción de oporto y papas gratinadas. Lomo de robalo al vapor con risotto de espárragos",
          img: "https://i.blogs.es/25d6b7/1366_2000-5-/450_1000.jpg"  
        },
        { 
          id: 4, 
          nombre: "Cena Gourmet de Alta Cocina", 
          descripcion: "Dim sum, Pita con hummus y tabulé, Croissants y panes con mermeladas artesanales, Frutas tropicales, Café expreso o té verde",
          img: "https://chefalexortiz.com/wp-content/uploads/2020/02/La-cocina-gourmet-en-eventos.jpg" 
        }
      ],
    };



    return (
        <section className={Styles.container}>
            <button className={Styles.volver}><Link href='facilities'>VOLVER</Link></button>
        <div className={Styles.portadaDetails}>
            <h1>RESTAURANTE</h1>
            <h2>DISFRUTA DE NUESTRA VARIEDAD GASTRONÓMICA</h2>
        </div>

        <article className={Style.article0Container}>
            <h2>RESTAURANTE</h2>
            <h1>DISFRUTA DE NUESTRAS INSTALACIONES Y NUESTRA GRAN VARIEDAD GASTRONÓMICA</h1>
        </article>
{/*Gimnasio de entrenamiento*/}
        <article className={Styles.gimnasioContainer}>
            <Image src={restaurantIMG} width={780} height={755} alt='Gimnasio' loading="lazy"/>

            <div className={Styles.containerGim}>
                <h1>Horas de Atención</h1>
                <p>Desayuno: <span>7:00 a 13:30</span></p>
                <p>Almuerzo: <span>13:00 a 14:00</span></p>
                <p>Cena: <span className={Styles.cena}>18:00 a 19:00</span></p>
                <p>Cena: <span className={Styles.cena}>20:30 a 22:00</span></p>
            </div>
        </article>

        {/*Alimentos*/}
        <article className={Styles.alimentosContainer}>
            <h2 className={Styles.subTitulos}>ALIMENTOS</h2>
            <h1>DETALLES DEL SERVICIO</h1>
            <p className={Styles.detalles}>
            En nuestro restaurante, nos enorgullece ofrecer un servicio impecable en cada uno de nuestros platillos. 
            Nuestro equipo de cocina trabaja con pasión para brindarte una experiencia gastronómica excepcional, 
            adaptada a tus gustos y necesidades dietéticas. Además, nuestro personal siempre está disponible 
            para asegurar que tu experiencia sea lo más cómoda posible. Desde opciones tradicionales hasta 
            innovadoras, cada plato está diseñado para deleitar tus sentidos.
             </p>

             <h1>REGLAS DEL RESTAURANTE</h1>
            <p className={Styles.detalles}>
            Nuestro restaurante sigue un código de conducta que garantiza una experiencia placentera para
             todos los comensales. Te pedimos que respetes las siguientes reglas:
             </p>
            
                <p className={Styles.detalles}>1- Por favor, mantén un tono de voz moderado.</p>
                <p className={Styles.detalles}>2- No está permitido fumar en el interior del restaurante.</p>
                <p className={Styles.detalles}>3- Se agradece la puntualidad para las reservas, para poder ofrecer un servicio más eficiente.</p>
                <p className={Styles.detalles}>4- Las mascotas no están permitidas dentro del restaurante.</p>


             <h1>CÓDIGO DE VESTIMENTA</h1>
            <p className={Styles.detalles}>
            Para asegurar que todos nuestros comensales disfruten de una experiencia agradable, 
            pedimos que se sigan las siguientes normas de vestimenta:
             </p>

             <p className={Styles.detalles}>
             Ropa casual o formal.
             </p>

             <p className={Styles.detalles}>
             No se permite el uso de trajes de baño o ropa deportiva dentro del restaurante.
             </p>
            </article>
        <hr className={Styles.hr}/>
        {/*Restaurante detalles*/}
        <article className={menuStyle.menuDetails}>
      <div className={menuStyle.submMenuDetails}>
      <h1>Menú de Comida del Restaurante</h1>
        <button
          onClick={() => setCategoriaActiva("desayuno")}
          className={categoriaActiva === "desayuno" ? menuStyle.activo : ""}
        >
          Desayuno
        </button>
        <button
          onClick={() => setCategoriaActiva("almuerzo")}
          className={categoriaActiva === "almuerzo" ? menuStyle.activo : ""}
        >
          Almuerzo
        </button>
        <button
          onClick={() => setCategoriaActiva("cena")}
          className={categoriaActiva === "cena" ? menuStyle.activo : ""}
        >
          Cena
        </button>
      </div>
      <button className={menuStyle.masDetalles} onClick={() => openModals()}>Mostrar más</button>

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
        <ModalReusable isOpens={isOpenModal} closeModal={closeModals}>
          {categoriaActiva === "desayuno" ? (
            <DesayunoMenu />
               ) : categoriaActiva === "almuerzo" ? (
                <AlmuerzoMenu />
                ) : categoriaActiva === "cena" ? (
                 <CenaMenu />
                 ) : null}
            </ModalReusable>
        </section>
    );
};

export default RestaurantComponent;
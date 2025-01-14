import Image from "next/image"
import { NosotrosDetallesProps } from "@/interfaces/TypeNosotros";
import Style from './nosotros.module.css';
import linkedin from '../../../public/Form Íconos/linkedin.png';
import whatsapp from '../../../public/Form Íconos/whatsapp.png';
import github from '../../../public/Form Íconos/github.png';


  export const NosotrosDetalles: React.FC<NosotrosDetallesProps> = ({ detalle }) => {
    if (!detalle) {
        return null;
      }
    return (
        <article className={Style.detalleContainer}>
              <div className={Style.nan}>
                <Image src={detalle.imagen || detalle.imageUrl} alt={detalle.name} width={200} height={150} className={Style.imagen} loading="lazy"/>
                <div className={Style.imageContainer}>
                <Image src={detalle.imagen || detalle.imageUrl} alt={detalle.name} width={200} height={150} className={Style.imagenFondo} loading="lazy"/>
                </div>
              </div>


                <h2 className={Style.nombreCompleto}>{detalle.nombreCompleto || detalle.name}</h2>

                {!detalle.aportes_en_PFhenrypt21b ? <p>No tienes contenido {detalle.name}</p>
                : <p className={Style.aportes}>{detalle.aportes_en_PFhenrypt21b}</p>}
                
                <div className={Style.redesContainer}>
                    <a className={Style.dfs} href={detalle.linkedin_link}>
                      <Image src={linkedin} width={100} height={100} alt="linkedin" loading="lazy"/>
                    {detalle.linkedin_link}</a>
                    <a className={Style.dfs} href={detalle.github_link}>
                      <Image src={github} width={100} height={100} alt="github" loading="lazy"/>
                    {detalle.github_link}</a>
                    <a className={Style.dfs} href={detalle.contacto_directo}>
                      <Image src={whatsapp} width={100} height={100} alt="whatsapp" loading="lazy"/>
                    {detalle.contacto_directo}</a>
                </div>
      </article>
    )
};

export default NosotrosDetalles;
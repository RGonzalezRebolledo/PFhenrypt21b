import Style from './style.module.css';
import { useState } from 'react';
import { almuerzos } from './data';


export const AlmuerzoMenu = () => {
    const [almuerzo, setAlmuerzo] = useState<"mediterraneo" | "internacional" | "caribeno" | "saludable">("mediterraneo");

    return (
        <article className={Style.container}>
            <h2>ALMUERZOS</h2>
            <div className={Style.buttonConainer}>
                <button onClick={() => setAlmuerzo("mediterraneo")} className={almuerzo === "mediterraneo" ? Style.select : ""}>Mediterráneo</button>
                <button onClick={() => setAlmuerzo("caribeno")} className={almuerzo === "caribeno" ? Style.select : ""}>Caribeño</button>
                <button onClick={() => setAlmuerzo("internacional")} className={almuerzo === "internacional" ? Style.select : ""}>Internacional</button>
                <button onClick={() => setAlmuerzo("saludable")}className={almuerzo === "saludable" ? Style.select : ""}>Saludable</button>
            </div>
            <div className={Style.detalles}>
                {almuerzos[almuerzo].map((categoria) => (
                    <div key={categoria.nombre}>
                        <p className={Style.txt}>{categoria.nombre}: <span>${categoria.precio}</span> </p>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default AlmuerzoMenu;
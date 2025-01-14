'use client';

import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { branchesData } from '@/helpers/branches';
import { TypesBranch } from '@/interfaces/TypesBranches';
import Style from './branches.module.css';
import Image from 'next/image';

const branches: TypesBranch[] = branchesData;

const BranchesComponent: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<TypesBranch | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  // Crear el mapa
  useEffect(() => {
    const newMap = new maplibregl.Map({
      container: 'map', 
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-99.1332, 19.4326], 
      zoom: 12,
    });

    setMap(newMap);

    return () => newMap.remove(); 
  }, []);


  const handleCardClick = (branch: TypesBranch) => {
    setSelectedBranch(branch);
    if (map) {
      map.flyTo({
        center: branch.coordinates, 
        zoom: 15,
        essential: true, 
      });
      new maplibregl.Marker()
        .setLngLat(branch.coordinates) 
        .addTo(map);
    }
  };

  return (
    <section className={Style.container}>
      <article className={Style.messageContainer}>
        <h1>¡Visitenos en nuestras sucursales!</h1>
        <p>Encuentra la sucursal más cercana y explora nuestros servicios. Haz clic en una tarjeta para ver su ubicación en el mapa.</p>
      </article>
      <div className={Style.subContainer}>
      {/* Contenedor de las tarjetas */}
      <article style={{ padding: '1rem', overflowY: 'scroll' }} 
      className={Style.cardsContainer}>
        <h2 className={Style.title}>Sucursales</h2>
        {branches.map((branch) => (
          <div className={`${selectedBranch?.id === branch.id ? Style.cardId : Style.card}`}
            key={branch.id}
            onClick={() => handleCardClick(branch)}
          >
            <div>
            <h3 className={Style.name}>{branch.name}</h3>
            <p>Coordinates: {branch.coordinates.join(', ')}</p>
            </div>
            <Image src={branch.img} width={100} height={200} alt='' className={Style.img} loading="lazy"/>
          </div>
        ))}
      </article>
      <article style={{ flex: 1 }} className={Style.mapContainer}>
        {/* Contenedor del mapa */}
        <h2 className={Style.title}>MAPA</h2>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </article>
      </div>
    </section>
  );
};

export default BranchesComponent;

'use client';
import React, { useState } from 'react';
import Style from './nosotros.module.css';
import ModalReusable from '../Modals/ModalReusable';
import { useModal } from '@/hooks/useModal';
import NosotrosDetalles from './NosotrosDetalles';
import { teamData } from './teamData';
import { detallePorMienbros, CardProps } from '@/interfaces/TypeNosotros';
import Image from 'next/image';

const NosotrosCard: React.FC<CardProps> = ({ name, role, imageUrl }) => {
  const [isOpenModal, openModals, closeModals] = useModal(false);
  const [detalle, setDetalle] = useState<detallePorMienbros | null>(null);

  const handleDetalle = (name: string) => {
    const miembroSeleccionado = teamData.find(member => member.name === name);
    setDetalle(miembroSeleccionado || null);
    openModals();
  };

  return (
    <div className={Style.card}>
      <Image src={imageUrl} alt={name} className={Style.cardImage} width={300} height={300} loading="lazy"/>
      <div className={Style.subCard}>
        <div className={Style.title}>
          <h3 className={Style.cardName}>{name}</h3>
          <p className={Style.role}>{role}</p>
        </div>
        <button className={Style.btModal} onClick={() => handleDetalle(name)}>VER MÁS</button>
      </div>

      <ModalReusable isOpens={isOpenModal} closeModal={closeModals}>
        <NosotrosDetalles detalle={detalle} />
      </ModalReusable>
    </div>
  );
};

export default NosotrosCard;

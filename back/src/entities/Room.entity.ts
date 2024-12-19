import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from './Reservation.entity';

@Entity({ name: 'rooms' })
export class Room {
  

  /**
   * Identificador único de la habitación.
   * @example "f34b2e7c-3ed5-4f91-9342-bf6c537dfb47"
   */
  @ApiProperty({

    example: 'f34b2e7c-3ed5-4f91-9342-bf6c537dfb47',
    description: 'Identificador único de la habitación.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  

  /**
   * Título o nombre de la habitación.
   * @example "Habitación Deluxe"
   */
  @ApiProperty({
    example: 'Habitación Deluxe',
    description: 'Título o nombre de la habitación.',
  })

  @Column({ unique: true })
  title: string;


  /**
   * Tamaño de la habitación.
   * @example "50m2"
   */
  @ApiProperty({
    example: '50m2',
    description: 'Tamaño de la habitación.',
  })
  @Column({ type: 'character varying', length: 10, default: '0m' })
  size: string;

  /**
   * Número de camas en la habitación.
   * @example 2
   */
  @ApiProperty({
    example: 2,
    description: 'Número de camas en la habitación.',
  })
  @Column({ type: 'int', default: 1 })
  beds: number;

  /**
   * Calificación promedio de la habitación.
   * @example 4.5
   */
  @ApiProperty({
    example: 4.5,
    description: 'Calificación promedio de la habitación.',
  })
  @Column({ type: 'float', default: 0 })
  rating: number;

  
  /**

   * URL de la imagen representativa de la habitación.
   * @example "https://example.com/room.jpg"
   */
  @ApiProperty({
    example: 'https://example.com/room.jpg',
    description: 'URL de la imagen representativa de la habitación.',
  })
  @Column({ nullable: true })
  image: string;

  
  /**

   * Precio de la habitación por noche.
   * @example 200.50
   */
  @ApiProperty({
    example: 200.5,
    description: 'Precio de la habitación por noche.',
  })
  @Column({ type: 'float', nullable: false })
  price: number;


  /**
   * Descripción detallada de la habitación.
   * @example "Habitación espaciosa con vistas al mar y todas las comodidades modernas."
   */
  @ApiProperty({
    example:
      'Habitación espaciosa con vistas al mar y todas las comodidades modernas.',
    description: 'Descripción detallada de la habitación.',
  })
  @Column({ type: 'text', nullable: false })
  description: string;


  /**
   * Tipo de habitación asociada.
   * @example 'd230c7d9-b983-4e78-b846-944dbe62d7b1'
   */
  @ApiProperty({
    example: 'd230c7d9-b983-4e78-b846-944dbe62d7b1',
    description: 'Tipo de habitación asociada.',
  })
  @Column({ type: 'varchar', length: 255 })

  roomType: string;


  /**
   * numero de la habitación.
   * @example 1
   */
  @ApiProperty({
    example: '1',
    description: 'numero de la habitación.',
  })

  @Column({ unique: true })
  roomNumber: number;


  @OneToMany(() => Reservation, (reservation) => reservation.room)
  @JoinColumn()
  reservations: Reservation[];

  /**
   * Estado de eliminación lógica de la habitación.
   * @example false
   */
  @ApiProperty({
    example: false,

    description: 'Indica si la habitación está eliminada de forma lógica.',

  })
  @Column({ default: false })
  isDeleted: boolean;
}

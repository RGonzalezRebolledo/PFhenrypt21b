import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../enums/enums';
import { Room } from './Room.entity';
import { User } from './User.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  /**
   * Identificador único de la reservación.
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identificador único de la reservación.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Usuario que realiza la reservación.
   */
  @ApiProperty({
    description: 'Usuario que realiza la reservación.',
  })
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Room, (room) => room.reservations)
  @JoinColumn()
  room: Room;

  /**
   * Habitación reservada.
   */
  @ApiProperty({
    description: 'Habitación reservada.',
  })
  @Column()
  roomId: string;

  /**
   * Fecha de check-in.
   * @example "2024-12-20"
   */
  @ApiProperty({
    example: '2024-12-20',
    description: 'Fecha de check-in.',
  })
  @Column('date')
  checkInDate: Date;

  /**
   * Fecha de check-out.
   * @example "2024-12-25"
   */
  @ApiProperty({
    example: '2024-12-25',
    description: 'Fecha de check-out.',
  })
  @Column('date')
  checkOutDate: Date;

  /**
   * Estado del pago de la reservación.
   * @example "Reserva no Pagado"
   */
  @ApiProperty({
    example: PaymentStatus.NOT_PAID,
    description: 'Estado del pago de la reservación.',
  })
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.NOT_PAID,
  })
  paymentStatus: PaymentStatus;


    /**
   * Fecha de creación de la reservación.
   * @example "2024-12-25"
   */
    @ApiProperty({
      example: '2024-12-25',
      description: 'Fecha de creación de la reservación.',
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    /**
    * Notificación recordartorio del pago pasadas 12 horas.
    */
    @ApiProperty({
    description: 'Notificación recordartorio del pago pasadas 12 horas.',
     })
    @Column({ default: false })
    notified12Hours: boolean;


  /**
   * Estado de eliminación lógica de la reservación.
   * @example false
   */
  @ApiProperty({
    example: false,
    description: 'Indica si la reservación está eliminada de forma lógica.',
  })
  @Column({ default: false })
  isDeleted: boolean;
}

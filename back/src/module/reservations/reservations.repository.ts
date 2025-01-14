import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../../entities/Reservation.entity';
import { Room } from '../../entities/Room.entity';
import { User } from '../../entities/User.entity';
import { Repository, Between } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateReservationDto } from './dto/create-reservations.dto';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly notificationService: NotificationsService,


  ) {}

  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { userId, roomId, checkInDate, checkOutDate } = createReservationDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const room = await this.roomRepository.findOne({ where: { id: roomId } });
  if (!room) {
    throw new Error('Habitación no encontrada');
  }

    const reservation = new Reservation();
    reservation.userId = userId; 
    reservation.roomId = roomId; 
    reservation.checkInDate = checkInDate;
    reservation.checkOutDate = checkOutDate;
    reservation.createdAt = new Date()

    const savedReservation = await this.reservationRepository.save(reservation);

    const reservationWithRelations = await this.reservationRepository.findOne({
      where: { id: savedReservation.id },
      relations: ['user', 'room'],
    });    

    if (!reservationWithRelations) {
      throw new Error('La reserva no se pudo cargar correctamente.');
    }

    await this.notificationService.sendReservationEmail(user, room, reservation);

    return reservationWithRelations;
  }


  async getReservations(page: number, limit: number): Promise<Reservation[]> {
    return this.reservationRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getReservationByuserId(userId: string): Promise<Reservation[]>{
    return await this.reservationRepository.find({
      where: {userId}
    });    
   }


  async deleteReservationById(id: string): Promise<{id:string}> {
    await this.reservationRepository.delete(id);
    return { id };
  }

  async findOverlappingReservation(createReservationDto: CreateReservationDto): Promise<Reservation | null> {
    const { roomId, checkInDate, checkOutDate } = createReservationDto;
    return this.reservationRepository.findOne({
      where: [
        {
          roomId,
          checkInDate: Between(checkInDate, checkOutDate),
        },
        {
          roomId,
          checkOutDate: Between(checkInDate, checkOutDate),
        },
      ],
    });
  }


  async findById(id: string): Promise<Reservation | null> {
    return await this.reservationRepository.findOne({ where: { id, isDeleted: false } });
  }
}
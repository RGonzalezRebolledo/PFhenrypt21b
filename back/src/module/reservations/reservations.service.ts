import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from '../../entities/Reservation.entity';
import { CreateReservationDto } from './dto/create-reservations.dto';
import { ReservationRepository } from './reservations.repository';
import { AuthService } from './../auth/auth.service';
import { RoomsRepository } from '../create-room/rooms.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly authService: AuthService,
    private readonly roomRepository: RoomsRepository,
  ) {}

  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { userId, roomId, checkInDate, checkOutDate } = createReservationDto;

    const user = await this.authService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new NotFoundException('Habitación no encontrada.');
    }

    const existingReservation = await this.reservationRepository.findOverlappingReservation(createReservationDto);
    if (existingReservation) {
      throw new Error('Ya existe una reserva en esta habitación en el rango de fechas especificado.');
    }

    return await this.reservationRepository.createReservation(createReservationDto);
  }

  async getReservations(page: number, limit: number): Promise<Reservation[]> {
    return this.reservationRepository.getReservations(page, limit);
  }

  async getReservationByuserId(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.getReservationByuserId(userId);
  }

  async deleteReservationById(id: string): Promise<{ id: string }> {
    return this.reservationRepository.deleteReservationById(id);
  }
}
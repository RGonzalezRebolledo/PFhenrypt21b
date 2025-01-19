import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Reservation } from '../../entities/Reservation.entity';
import { User } from '../../entities/User.entity';
import { Room } from '../../entities/Room.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { Repository } from 'typeorm';
import { PaymentStatus } from '../../enums/enums';

@Injectable()
export class SchedulerService {
    constructor(
         @InjectRepository(Reservation)
         private readonly reservationRepository: Repository<Reservation>,
         @InjectRepository(User)
         private readonly userRepository: Repository<User>,
         @InjectRepository(Room)
         private readonly roomRepository: Repository<Room>,
         private readonly notificationService: NotificationsService,
    ){}


    @Cron(CronExpression.EVERY_10_SECONDS) //Despues de test, cambiar a un intervalo mayor para evitar sobrecarga
    async checkExpiredReservations() {    
      const now = new Date();
      const expiredReservations = await this.reservationRepository.find({
        where: {
            paymentStatus: PaymentStatus.NOT_PAID,
            isDeleted: false,
        },
      });
  
      for (const reservation of expiredReservations) {
  
        const createdAt = new Date(reservation.createdAt);
        const timeElapsed = now.getTime() - createdAt.getTime();
  
        // const hoursElapsed = timeElapsed / (1000 * 60 * 60); //metodo correcto de conversión a 24 horas
        const secondsElapsed = timeElapsed / 1000;              //metodo temporal de conversión a segs
        // Ahora mismo esta advertencia esta a 60 segundos
        if (secondsElapsed > 60 && secondsElapsed <= 120 && !reservation.notified12Hours) {
          const user = await this.userRepository.findOne({ where: { id: reservation.userId } });
          const room = await this.roomRepository.findOne({ where: { id: reservation.roomId } });
  
          reservation.notified12Hours = true; 
           await this.notificationService.sendReminderNotification(user, room, reservation)
          await this.reservationRepository.save(reservation);
          console.log(`12-hour notification sent for reservation ${reservation.id}`);
        }
  
          // Ahora mismo esta eliminación y notificación estan a 120 segundos
        if (secondsElapsed > 120 && !reservation.isDeleted) {
          const user = await this.userRepository.findOne({ where: { id: reservation.userId } });
  
          reservation.isDeleted = true;
          await this.reservationRepository.save(reservation);
          console.log(`Reservation ${reservation.id} marked as deleted.`);
  
           await this.notificationService.sendDeletionNotification(user, reservation);
          console.log(`Deletion notification sent for reservation ${reservation.id}`);  
        }
      }
    }
}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { Reservation } from '../../entities/Reservation.entity';
import { Room } from '../../entities/Room.entity';
import { User } from '../../entities/User.entity';
import { AuthModule } from "../auth/auth.module";
import { RoomsModule } from "../create-room/rooms.module";
import { NotificationsService } from "../notifications/notifications.service";
import { PaymentModule } from "../payment/payment.module";
import { ReservationController } from "./reservations.controller";
import { ReservationRepository } from "./reservations.repository";
import { ReservationService } from "./reservations.service";

@Module({
    imports: [TypeOrmModule.forFeature([Reservation, Room, User]), 
    AuthModule, RoomsModule, PaymentModule],
    providers: [ReservationService, ReservationRepository, NotificationsService],
    controllers: [ReservationController],
    exports: [ReservationService, ReservationRepository],
})
export class ReservationsModule {}
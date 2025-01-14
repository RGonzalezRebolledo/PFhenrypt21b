import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservation } from '../../entities/Reservation.entity';
import { Room } from '../../entities/Room.entity';
import { User } from '../../entities/User.entity';
import { NotificationsService } from "../notifications/notifications.service";
import { SchedulerService } from "./scheduler.services";



@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Room, User]), ScheduleModule.forRoot()],
    providers: [SchedulerService, NotificationsService],
  })
  export class SchedulerModule {}
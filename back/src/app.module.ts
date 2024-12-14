import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './module/files/files.module';
import { RoomsModule } from './module/create-room/rooms.module';
import { NotificationsModule } from './module/notifications/notifications.module';
import { ReservationsModule } from './module/reservations/reservations.module';
import { User } from './entities/User.entity';
import { Room } from './entities/Room.entity';
import { Reservation } from './entities/Reservation.entity';
import { UsersModule } from './module/users/users.module'; 


@Module({
  imports: [
    AuthModule,
    FilesModule,
    RoomsModule,
    ReservationsModule,
    UsersModule,

    
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
      secret: process.env.JWT_SECRET,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (Config: ConfigService) => Config.get('typeorm')
    }),
  ],
 
  controllers: [],
  providers: [],
})
export class AppModule {}

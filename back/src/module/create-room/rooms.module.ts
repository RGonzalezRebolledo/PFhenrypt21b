import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from '../../entities/Room.entity';
import { FilesModule } from '../files/files.module';
import { RoomsRepository } from './rooms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), FilesModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
  exports: [RoomsRepository]
})
export class RoomsModule {}

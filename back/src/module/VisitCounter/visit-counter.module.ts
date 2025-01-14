import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitCounter } from '../../entities/VisitCounter.entity';
import { VisitCounterController } from './VisitCounter.Controller';
import { VisitCounterService } from './VisitCounter.Service';
import { VisitCounterRepository } from './VisitCounterRepository';

@Module({
  imports: [TypeOrmModule.forFeature([VisitCounter])],
  controllers: [VisitCounterController],
  providers: [VisitCounterService, VisitCounterRepository],
})
export class VisitCounterModule {}

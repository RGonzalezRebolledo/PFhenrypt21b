import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/User.entity';
import { Testimonial } from '../../entities/Testimonial.entity';
import { RolesModule } from '../../module/roles/roles.module';


@Module({
  imports: [TypeOrmModule.forFeature([User, Testimonial]),
  RolesModule,
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}

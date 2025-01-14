import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

import { RolesRepository  } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../entities/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  exports: [RolesRepository, RolesService],
})
export class RolesModule {}

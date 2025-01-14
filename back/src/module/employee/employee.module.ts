import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../entities/Employee.entity';
import { Role } from '../../entities/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Role])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../entities/Employee.entity';
import { Role } from '../../entities/Role.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createEmployee: CreateEmployeeDto) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { dni: createEmployee.dni },
    });
    if (employeeFound) {
      throw new BadRequestException('El empleado ya existe');
    }

    const roleFound = await this.roleRepository.findOne({
      where: { name: createEmployee.role },
    });
    if (!roleFound) {
      throw new BadRequestException('El rol no existe');
    }

    const employee = this.employeeRepository.create({
      name: createEmployee.name,
      dni: createEmployee.dni,
      birthdate: createEmployee.birthdate,
      phone: createEmployee.phone,
      role: roleFound,
    });
    return this.employeeRepository.save(employee);
  }

  async findAll() {
    return await this.employeeRepository.find({ relations: ['role'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  async update(updateEmployee: UpdateEmployeeDto) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { dni: updateEmployee.dni },
    });
    if (!employeeFound) {
      throw new BadRequestException('El empleado no existe');
    }

    const roleFound = await this.roleRepository.findOne({
      where: { name: updateEmployee.role },
    });
    if (!roleFound) {
      throw new BadRequestException('El rol no existe');
    }

    const changedEmployee = { ...updateEmployee, ...employeeFound };
    const newEmployee = this.employeeRepository.save(changedEmployee);

    return { message: 'Empleado actualizado', data: newEmployee };
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}

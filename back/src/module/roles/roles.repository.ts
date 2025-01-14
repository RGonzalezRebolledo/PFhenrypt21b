import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../entities/Role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { rolesMock } from './roles-mock';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: Partial<Role>): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async deleteRoleById(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }

  async seedRoles() {
    const existingRoleNames = (await this.roleRepository.find()).map(
      (role) => role.name,
    );

    for (const roleData of rolesMock) {
      if (!existingRoleNames.includes(roleData.name)) {
        const role = new Role();
        role.name = roleData.name;
        role.description = roleData.description;
        await this.roleRepository.save(role);
      }
    }

    console.log('Roles seeding completed');
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async searchUsersByName(search: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.name) LIKE LOWER(:search)', { search: `%${search}%` })
      .getMany();
  }

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['reservations','role'],
      where: {
        role: {
            name: 'Cliente'
        }
    }

  });
    
  }

  async findUsersById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });
  }


  ///// login google
  async findUsersByGoogleAuthProvider(): Promise<User[]> {
    return this.userRepository.find({ where: { authProvider: 'google' } });
  }

  async updateUserRole(userId: string, roleId: string): Promise<void> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ role: { id: roleId } })
      .where('id = :userId', { userId })
      .execute();
      
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
  }

  
}



import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { NotificationsService } from '../notifications/notifications.service';
import { RolesService } from '../../module/roles/roles.service';
import { adminMock } from './admin-mock';
import { Role } from '../../entities/Role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationsService,
    private readonly rolesService: RolesService,
  ) {}

  async signIn(userLogin: LoginUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: userLogin.email },
      relations: ['role'],      
    });
    if (!userFound) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const isValidPassword = await bcrypt.compare(
      userLogin.password,
      userFound.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const userPayload = {
      sub: userFound.id,
      id: userFound.id,
      email: userFound.email,
      role: {
        id: userFound.role.id,
        name: userFound.role.name, 
      },
    };
    const token = this.jwtService.sign(userPayload);
    return { success: 'Inicio de sesión exitoso', token, user: userFound };
  }



  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }],
    });
  
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }
  
    const existingUserDni = await this.userRepository.findOne({
      where: [{ dni: createUserDto.dni }],
    });
  
    if (existingUserDni) {
      throw new ConflictException('El Dni ya está registrado');
    }
  
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
    const clienteRole = await this.rolesService.getRoleByNameCliente();
    const roleId = clienteRole.id;
  
    const newUser = this.userRepository.create({
      name: createUserDto.name,
      phone: createUserDto.phone,
      email: createUserDto.email,
      password: hashedPassword,
      dni: createUserDto.dni,
      registrationDate: new Date().toISOString().split('T')[0],
      isAdmin: false,
      role: { id: roleId },
      authProvider: createUserDto.authProvider, // Aquí se incluye el authProvider
    });
  
    const savedUser = await this.userRepository.save(newUser);
  
    try {
      await this.notificationService.sendWelcomeEmail(savedUser.email, savedUser.name);
    } catch (error) {
      console.error('Error enviando el correo de bienvenida:', error);
    }

    return {
      id: savedUser.id,
      name: savedUser.name,
      phone: savedUser.phone,
      email: savedUser.email,
      dni: savedUser.dni,
      registrationDate: savedUser.registrationDate,
      isAdmin: savedUser.isAdmin,
      role: savedUser.role,
      authProvider: savedUser.authProvider, // LOGIN GOOGLE CAMPO ADICIONAL NO OBLIGATORIO
    };
  }
  
  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  
  async seedAdmin() {
    const existingAdmins = (await this.userRepository.find()).map(
      (user) => user.email,
    );

    let adminRole = await this.roleRepository.findOne({ where: { name: 'Administrador' } });

    if (!adminRole) {
      adminRole = new Role();
      adminRole.name = 'Administrador';
      adminRole.description = 'Persona con permisos de administrador.';
      await this.roleRepository.save(adminRole);
    }

    for (const authData of adminMock) {
      if (!existingAdmins.includes(authData.email)) {
        const user = new User();
        user.name = authData.name;
        user.phone = authData.phone;
        user.email = authData.email;
        user.password = await bcrypt.hash(authData.password, 10);
        user.dni = authData.dni;
        user.registrationDate = authData.registrationDate;

        user.role = adminRole;

        await this.userRepository.save(user);
      }
    }

    console.log('Admin seeding completed');
  }
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './User.entity';
import { Employee } from './Employee.entity';

@Entity({ name: 'roles' })
export class Role {


    /**
   * Identificador único del rol.
   * @example "f34b2e7c-3ed5-4f91-9342-bf6c537dfb47"
   */
    @ApiProperty({

      example: 'f34b2e7c-3ed5-4f91-9342-bf6c537dfb47',
      description: 'Identificador único del rol.',
    })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre del rol.
   * @example 'Admin'
   */
  @ApiProperty({
    example: 'Admin',
    description: 'Nombre del rol.'
  })
  @Column()
  name: string;

  /**
   * Descripción del rol.
   * @example 'Administrador con acceso completo a todas las funcionalidades.'
   */
  @ApiProperty({
    example: 'Administrador con acceso completo a todas las funcionalidades.',
    description: 'Descripción del rol.'
  })
  @Column()
  description: string;

   /**
   * Usuarios asociados al rol.
   */
   @OneToMany(() => User, (user) => user.role)
   users: User[];

   @OneToMany(() => Employee, (employee) => employee.role)
   employees: Employee[];
}

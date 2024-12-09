
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre del usuario.
   * @example 'John Doe'
   */
  @ApiProperty({
    example: 'John Doe',
    description: 'Nombre del usuario.',
  })
  @Column()
  name: string;

  /**
   * Número de teléfono del usuario.
   * @example '+1234567890'
   */
  @ApiProperty({
    example: '+12345678',
    description: 'Número de teléfono del usuario.',
  })
  @Column()
  phone: string;

  /**
   * Fecha de registro del usuario.
   * @example '2024-12-05'
   */
  @ApiProperty({
    example: '2024-12-05',
    description: 'Fecha de registro del usuario.',
  })
  @Column('date')
  registrationDate: string;

  /**
   * Correo electrónico asociado a las credenciales.
   * @example 'user@example.com'
   */
  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico asociado a las credenciales.',
  })
  @Column()
  email: string;

  /**
   * Contraseña asociada a las credenciales.
   * @example 'StrongPassword123'
   */
  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Contraseña asociada a las credenciales.',
  })
  @Column()
  password: string;

  /**
   * Indica si el usuario tiene privilegios de administrador.
   * @example false
   */
  @ApiProperty({
    example: false,
    description: 'Indica si el usuario tiene privilegios de administrador.',
  })
  @Column({ default: false })
  isAdmin: boolean;

  /**
   * Documento Nacional de Identidad (DNI).
   * @example '12345678A'
   */
  @ApiProperty({
    example: '12345678A',
    description: 'Documento Nacional de Identidad (DNI).',
  })
  @Column({ unique: true, nullable: false })
  dni: string;
  
}

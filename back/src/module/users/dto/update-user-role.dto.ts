import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserRoleDto {
  @ApiProperty({
    description: 'Nombre del rol a asignar',
    example: 'Cliente'
  })
  @IsString()
  @IsNotEmpty()
  roleName: string;
}
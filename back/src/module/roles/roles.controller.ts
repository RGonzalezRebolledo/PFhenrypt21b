import { Controller, Post, Get, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from 'src/entities/Role.entity';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Roles')

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ status: 201, description: 'Role created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Retrieved all roles.' })
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

//buscar por nombre de rol
  @Get('cliente')
@HttpCode(HttpStatus.OK)
@ApiResponse({ status: 200, description: 'Rol Cliente encontrado.' })
@ApiResponse({ status: 404, description: 'Rol Cliente no encontrado.' })
async getRoleCliente(): Promise<Role> {
  return this.rolesService.getRoleByNameCliente();
}


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Role deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.rolesService.deleteRoleById(id);
  }
}

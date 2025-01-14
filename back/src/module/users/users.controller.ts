import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchUserDto } from '../users/dto/search-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { User } from 'src/entities/User.entity';
import { RolesService } from '../roles/roles.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin') 
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Buscar usuarios por coincidencia en el nombre' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios coincidentes',
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación en el parámetro de búsqueda',
  })
  async searchUsers(@Query() searchUserDto: SearchUserDto) {
    return this.usersService.searchUsersByName(searchUserDto.search);
  }

  @Get('clientlist')
  @HttpCode(HttpStatus.OK)
  async findUsers() {
    return this.usersService.findUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUsersById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findUsersById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  /// google login
  @Get('google-auth')
  async getUsersByGoogleAuthProvider(): Promise<User[]> {
    return this.usersService.findUsersByGoogleAuthProvider();
  }

  @Patch(':userId/role')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar rol de usuario' })
  @ApiResponse({ status: 200, description: 'Rol actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Usuario o rol no encontrado.' })
  @UsePipes(new ValidationPipe())
  async updateUserRole(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto
  ) {
    const role = await this.rolesService.getRoleByName(updateUserRoleDto.roleName);
    console.log("role encontrolador: " + role);
    await this.usersService.updateUserRole(userId, role.id);
    
    return {
      message: 'Rol actualizado correctamente'
    };
  }
}

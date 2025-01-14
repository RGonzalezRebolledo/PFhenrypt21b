import { Controller, Post, Delete, Get, Body, Param, Query, HttpCode, HttpStatus, UploadedFile, UseInterceptors, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from '../../entities/Room.entity';
import { ApiBody, ApiConsumes, ApiTags, ApiResponse } from '@nestjs/swagger';

import { ImageValidatorPipe } from '../../pipes/imageValidatorPipe';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { Roles } from '../../decorators/roles/roles.decorator';



@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiTags('Rooms')

  @Post('registerRoom')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Roles('Administrador') // Aplicar roles solo en esta ruta
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get('getRooms')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Retrieved all rooms.' })
  async getAllRooms(@Query('page') page: number = 1, @Query('limit') limit: number = 50): Promise<Room[]> {
    return this.roomsService.getAllRooms(page, limit);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles('Administrador') 
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteRoomById(@Param('id') id: string) {
    return this.roomsService.deleteRoomById(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Room retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  async getRoomById(@Param('id') id: string): Promise<Room> {
    const room = await this.roomsService.getRoomById(id);
    if (!room) {
      throw new BadRequestException('Room not found.');
    }
    return room;
  }
  


}




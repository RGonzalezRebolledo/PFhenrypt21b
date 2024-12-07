import { Controller, Post, Delete, Get, Body, Param, Query, HttpCode, HttpStatus, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from 'src/entities/Room.entity';
import { ApiBody, ApiConsumes, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ImageValidatorPipe } from 'src/pipes/imageValidatorPipe';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @ApiTags('Rooms')


  @Post('registerRoom')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFile(new ImageValidatorPipe()) image: Express.Multer.File) {
      if (!image) {
        throw new BadRequestException('Image file is required');
      }
    return this.roomsService.createRoom(createRoomDto, image);
  }


  @Get('getRooms')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Retrieved all rooms.' })
  async getAllRooms(@Query('page') page: number=1, @Query('limit') limit: number=5): Promise<Room[]> {
    return this.roomsService.getAllRooms(page, limit);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async deleteRoomById(@Param('id') id: string): Promise<void> {
    return this.roomsService.deleteRoomById(id);
  }
}

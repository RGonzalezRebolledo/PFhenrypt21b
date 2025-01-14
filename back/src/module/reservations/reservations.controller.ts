import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservations.dto';
import { ApiTags } from "@nestjs/swagger";
import { ReservationService } from './reservations.service';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { Roles } from '../../decorators/roles/roles.decorator';

@Controller('reservations')
@UseGuards(JwtAuthGuard) 
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @ApiTags('Reservations')

  @Roles('admin', 'cliente')
  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }
  
  @Roles('admin')
  @Get()
  async getReservations(@Query('page') page: number=1, @Query('limit') limit: number=5) {
      return this.reservationService.getReservations(page, limit);
  }

  @Get(':id')
  async getReservationByuserId(@Param('id', new ParseUUIDPipe()) userId: string) {
     return await this.reservationService.getReservationByuserId(userId);
  }

  @Delete(':id')
  async deleteReservationById(@Param('id') id: string) {
     return this.reservationService.deleteReservationById(id);
  }
}
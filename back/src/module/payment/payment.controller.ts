import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {Stripe} from 'stripe';
import { ApiTags } from '@nestjs/swagger';
import { ReservationRepository } from '../reservations/reservations.repository';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard) 
export class PaymentController {
  private readonly reservationRepository: ReservationRepository
  private stripe: Stripe;


  constructor(private readonly paymentService: PaymentService) {}

@Post('/checkout')
async createCheckoutSession(@Body() createPaymentDto: CreatePaymentDto, 
@Body('reservationId') reservationId: string) {
  return this.paymentService.createCheckoutSession(createPaymentDto, reservationId);
}

@Get('/success')
  async handlePaymentSuccess(@Query('reservationId') reservationId: string) {
    return await this.paymentService.handlePaymentSuccess(reservationId);
  }

  @Get('/cancel')
  handleCancel() {
    return { message: 'Pago cancelado.' };
  }
}

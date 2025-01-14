import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';
import { PaymentStatus } from '../../enums/enums';
import { ReservationRepository } from '../reservations/reservations.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../../entities/Reservation.entity';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
import { User } from '../../entities/User.entity';
import { Room } from '../../entities/Room.entity';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly notificationService: NotificationsService
  ) {
    const stripeKey = process.env.STRIPE_KEY;
    if (!stripeKey) {
      throw new Error('Stripe key is not defined in environment variables');
    }
    this.stripe = new Stripe(stripeKey);  }

  async createCheckoutSession(createPaymentDto: CreatePaymentDto, reservationId: string) {
    const { amount, currency, description } = createPaymentDto;
  
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: description || 'Payment',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        reservationId, 
      },
      //success_url: 'http://localhost:4000/payments/success?reservationId=${reservationId}' ruta para actualizar PaymentStatus
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
  
    return {
      url: session.url,
    };
  }
  
  
  async handlePaymentSuccess(reservationId: string) {
    await this.reservationRepository.manager.transaction(async (transactionalEntityManager) => {
      
    const reservation = await this.reservationRepository.findOne({ where: { id: reservationId } });
    if (!reservation) {
      throw new Error('Reserva no encontrada.');
    }

    const user = await transactionalEntityManager.findOne(User, { where: { id: reservation.userId } });
    const room = await transactionalEntityManager.findOne(Room, { where: { id: reservation.roomId } });


    room.available = false;
    reservation.paymentStatus = PaymentStatus.PAID_ONLINE;

    await transactionalEntityManager.save(Room, room);
    await transactionalEntityManager.save(Reservation, reservation);

     await this.notificationService.sendPaymentSuccessNotification(user, room, reservation)
    });

    return { message: 'Pago exitoso, estado de reserva actualizado.' };
  };
};

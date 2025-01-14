import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Reservation } from '../../entities/Reservation.entity';
import { Room } from '../../entities/Room.entity';
import { User } from '../../entities/User.entity';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendWelcomeEmail(to: string, username: string): Promise<void> {

    const mailOptions = {
      from: '"Elysium Hotel & Resort" <tu-email@gmail.com>',
      to,
      subject: '¡Bienvenido/a a Elysium, tu escape de lujo en California! 🌴✨',
      text: `Hola ${username},
  
  ¡Gracias por registrarte en Elysium Hotel & Resort! Nos alegra tenerte como parte de nuestra exclusiva comunidad de huéspedes.
  
  En Elysium, nuestra misión es ofrecerte una experiencia única de lujo en el corazón de California. Ya sea que estés buscando un descanso relajante, una aventura emocionante o simplemente un lugar especial para crear recuerdos inolvidables, estamos aquí para hacer que tu estadía sea inolvidable.
  
  ¿Qué puedes esperar de Elysium?
  - 🏖️ Ubicación privilegiada: Con vistas espectaculares y cercanía a las mejores atracciones de California.
  - 🍷 Gastronomía de clase mundial: Saborea los mejores platos en nuestros restaurantes exclusivos.
  - 💆‍♀️ Bienestar y relajación: Disfruta de nuestro spa y áreas recreativas diseñadas para tu confort.
  
  Estamos ansiosos por darte la bienvenida personalmente y ayudarte a descubrir todo lo que Elysium tiene para ofrecer.
  
  Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Estamos aquí para ti!
  
  ¡Vive una experiencia única en Elysium!
  El equipo de Elysium Hotel & Resort.
  
  Contacto:
  📧 info@elysiumhotel.com
  📞 +1-800-123-4567
  🌐 www.elysiumhotel.com`,
      html: `
        <p>Hola <strong>${username}</strong>,</p>
        <p>¡Gracias por registrarte en <strong>Elysium Hotel & Resort</strong>! Nos alegra tenerte como parte de nuestra exclusiva comunidad de huéspedes.</p>
        <p>En <strong>Elysium</strong>, nuestra misión es ofrecerte una experiencia única de lujo en el corazón de California. Ya sea que estés buscando un descanso relajante, una aventura emocionante o simplemente un lugar especial para crear recuerdos inolvidables, estamos aquí para hacer que tu estadía sea inolvidable.</p>
        <p><strong>¿Qué puedes esperar de Elysium?</strong></p>
        <ul>
          <li>🏖️ <strong>Ubicación privilegiada</strong>: Con vistas espectaculares y cercanía a las mejores atracciones de California.</li>
          <li>🍷 <strong>Gastronomía de clase mundial</strong>: Saborea los mejores platos en nuestros restaurantes exclusivos.</li>
          <li>💆‍♀️ <strong>Bienestar y relajación</strong>: Disfruta de nuestro spa y áreas recreativas diseñadas para tu confort.</li>
        </ul>
        <p>Estamos ansiosos por darte la bienvenida personalmente y ayudarte a descubrir todo lo que <strong>Elysium</strong> tiene para ofrecer.</p>
        <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Estamos aquí para ti!</p>
        <p><strong>¡Vive una experiencia única en Elysium!</strong><br>
        El equipo de Elysium Hotel & Resort</p>
        <p><strong>Contacto:</strong><br>
        📧 info@elysiumhotel.com<br>
        📞 +1-800-123-4567<br>
        🌐 <a href="https://www.elysiumhotel.com">www.elysiumhotel.com</a></p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendReservationEmail(user: User, room: Room, reservation: Reservation): Promise<void> {
   
    const mailOptions = {
      from: '"Elysium Hotel & Resort" <tu-email@gmail.com>',
      to:user.email,
      subject: 'Detalles de tu reservación en Elysium Hotel & Resort',
      text: `Hola ${user.name},
  
      Tu reservación ha sido confirmada con los siguientes detalles:
      - Habitación: ${room.title} (${room.size}, ${room.beds} cama(s))
      - Precio por noche: $${room.price}
      - Check-in: ${reservation.checkInDate.toDateString()}
      - Check-out: ${reservation.checkOutDate.toDateString()}
      - Descripción: ${room.description}
      - Estado del pago: ${reservation.paymentStatus}
      
      Estamos emocionados de recibirte pronto en Elysium Hotel & Resort. Si tienes preguntas o necesitas asistencia, no dudes en contactarnos.
  
      ¡Gracias por elegirnos!
  
      Elysium Hotel & Resort
      📧 info@elysiumhotel.com
      📞 +1-800-123-4567
      🌐 www.elysiumhotel.com`,
      html: `
        <p>Hola, ${user.name}</p>
        <p>Tu reservación ha sido confirmada con los siguientes detalles:</p>
        <ul>
          <li><strong>Habitación:</strong> ${room.title} (${room.size}, ${room.beds} cama(s))</li>
          <li><strong>Precio por noche:</strong> $${room.price}</li>
          <li><strong>Check-in:</strong> ${reservation.checkInDate.toDateString()}</li>
          <li><strong>Check-out:</strong> ${reservation.checkOutDate.toDateString()}</li>
          <li><strong>Descripción:</strong> ${room.description}</li>
        </ul>
        <p>Estamos emocionados de recibirte pronto en <strong>Elysium Hotel & Resort</strong>. Si tienes preguntas o necesitas asistencia, no dudes en contactarnos.</p>
        <p><strong>¡Gracias por elegirnos!</strong><br>
        Elysium Hotel & Resort<br>
        📧 info@elysiumhotel.com<br>
        📞 +1-800-123-4567<br>
        🌐 <a href="https://www.elysiumhotel.com">www.elysiumhotel.com</a></p>
      `,
    };
    
    
    await this.transporter.sendMail(mailOptions);
  }


  async sendReminderNotification(user: User, room: Room, reservation: Reservation): Promise<void> {
  
    const checkInDate = new Date(reservation.checkInDate);
    const checkOutDate = new Date(reservation.checkOutDate);


    const mailOptions = {
      from: '"Elysium Hotel & Resort" <tu-email@gmail.com>',
      to: user.email,
      subject: '⏳ ¡Última oportunidad para pagar tu reservación! ⏳',
      text: `Hola ${user.name},
      
      Queremos recordarte que tu reservación está a punto de expirar. Aquí están los detalles:
      - Habitación: ${room.title} (${room.size}, ${room.beds} cama(s))
      - Check-in: ${checkInDate.toDateString()}
      - Check-out: ${checkOutDate.toDateString()}
      - Estado del pago: ${reservation.paymentStatus}
      
      Por favor, realiza tu pago dentro de las próximas 12 horas para asegurar tu reservación.
      
      Si necesitas asistencia, contáctanos.
      
      Elysium Hotel & Resort
      📧 info@elysiumhotel.com
      📞 +1-800-123-4567
      🌐 www.elysiumhotel.com`,
      html: `
        <p>Hola <strong>${user.name}</strong>,</p>
        <p>Queremos recordarte que tu reservación está a punto de expirar. Aquí están los detalles:</p>
        <ul>
          <li><strong>Habitación:</strong> ${room.title} (${room.size}, ${room.beds} cama(s))</li>
          <li><strong>Check-in:</strong> ${checkInDate.toDateString()}</li>
          <li><strong>Check-out:</strong> ${checkOutDate.toDateString()}</li>
          <li><strong>Estado del pago:</strong> ${reservation.paymentStatus}</li>
        </ul>
        <p><strong>Por favor, realiza tu pago dentro de las próximas 12 horas para asegurar tu reservación.</strong></p>
        <p>Si necesitas asistencia, contáctanos.</p>
        <p><strong>Elysium Hotel & Resort</strong><br>
        📧 info@elysiumhotel.com<br>
        📞 +1-800-123-4567<br>
        🌐 <a href="https://www.elysiumhotel.com">www.elysiumhotel.com</a></p>
      `,
    };
  
    await this.transporter.sendMail(mailOptions);
  }

  async sendDeletionNotification(user: User, reservation: Reservation): Promise<void> {
      
    const checkInDate = new Date(reservation.checkInDate);
    const checkOutDate = new Date(reservation.checkOutDate);

    const mailOptions = {
      from: '"Elysium Hotel & Resort" <tu-email@gmail.com>',
      to: user.email,
      subject: '❌ Reservación cancelada en Elysium Hotel & Resort ❌',
      text: `Hola ${user.name},
      
      Lamentamos informarte que tu reservación ha sido cancelada debido a la falta de pago dentro del tiempo establecido. Aquí están los detalles de la reservación cancelada:
      - Check-in: ${checkInDate.toDateString()}
      - Check-out: ${checkOutDate.toDateString()}
      
      Si tienes alguna pregunta o deseas realizar una nueva reservación, no dudes en contactarnos.
      
      Elysium Hotel & Resort
      📧 info@elysiumhotel.com
      📞 +1-800-123-4567
      🌐 www.elysiumhotel.com`,
      html: `
        <p>Hola <strong>${user.name}</strong>,</p>
        <p>Lamentamos informarte que tu reservación ha sido cancelada debido a la falta de pago dentro del tiempo establecido. Aquí están los detalles de la reservación cancelada:</p>
        <ul>
          <li><strong>Check-in:</strong> ${checkInDate.toDateString()}</li>
          <li><strong>Check-out:</strong> ${checkOutDate.toDateString()}</li>
        </ul>
        <p>Si tienes alguna pregunta o deseas realizar una nueva reservación, no dudes en contactarnos.</p>
        <p><strong>Elysium Hotel & Resort</strong><br>
        📧 info@elysiumhotel.com<br>
        📞 +1-800-123-4567<br>
        🌐 <a href="https://www.elysiumhotel.com">www.elysiumhotel.com</a></p>
      `,
    };
  
    await this.transporter.sendMail(mailOptions);
  }

  async sendPaymentSuccessNotification(user: User, room: Room, reservation: Reservation): Promise<void> {
    const checkInDate = new Date(reservation.checkInDate);
    const checkOutDate = new Date(reservation.checkOutDate);
  
    const mailOptions = {
      from: '"Elysium Hotel & Resort" <tu-email@gmail.com>',
      to: user.email,
      subject: '✅ Pago confirmado para tu reservación en Elysium Hotel & Resort ✅',
      text: `Hola ${user.name},
      
      ¡Nos complace informarte que tu pago ha sido confirmado con éxito! Aquí están los detalles de tu reservación:
  
      - Habitación: ${room.title} (${room.size}, ${room.beds} cama(s))
      - Check-in: ${checkInDate.toDateString()}
      - Check-out: ${checkOutDate.toDateString()}
      - Estado del pago: ${reservation.paymentStatus}
      
      Gracias por elegir Elysium Hotel & Resort. Estamos emocionados de recibirte. Si tienes alguna pregunta o deseas modificar tu reservación, no dudes en contactarnos.
  
      Elysium Hotel & Resort
      📧 info@elysiumhotel.com
      📞 +1-800-123-4567
      🌐 www.elysiumhotel.com`,
      html: `
        <p>Hola <strong>${user.name}</strong>,</p>
        <p>¡Nos complace informarte que tu pago ha sido confirmado con éxito! Aquí están los detalles de tu reservación:</p>
        <ul>
          <li><strong>Habitación:</strong> ${room.title} (${room.size}, ${room.beds} cama(s))</li>
          <li><strong>Check-in:</strong> ${checkInDate.toDateString()}</li>
          <li><strong>Check-out:</strong> ${checkOutDate.toDateString()}</li>
          <li><strong>Estado del pago:</strong> ${reservation.paymentStatus}</li>
        </ul>
        <p>Gracias por elegir <strong>Elysium Hotel & Resort</strong>. Estamos emocionados de recibirte. Si tienes alguna pregunta o deseas modificar tu reservación, no dudes en contactarnos.</p>
        <p><strong>Elysium Hotel & Resort</strong><br>
        📧 info@elysiumhotel.com<br>
        📞 +1-800-123-4567<br>
        🌐 <a href="https://www.elysiumhotel.com">www.elysiumhotel.com</a></p>
      `,
    };
  
    await this.transporter.sendMail(mailOptions);
  }
}

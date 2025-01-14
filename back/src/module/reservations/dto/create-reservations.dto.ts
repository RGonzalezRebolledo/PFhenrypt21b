import { IsDate, IsString, IsNotEmpty, Validate  } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CheckInBeforeCheckOut } from '../../../validators/checkin-before-checkout.validator';

export class CreateReservationDto {

    /**
   * ID del usuario que realiza la reservación.
   */
    @ApiProperty({
      description: 'ID del usuario que realiza la reservación.',
      example: '123e4567-e89b-12d3-a456-426614174000',
    })
  @IsString()  
  @IsNotEmpty({ message: 'El ID del usuario es requerido.' })
  userId: string;


   /**
   * ID de la habitación que se quiere reservar.
   */
   @ApiProperty({
    description: 'ID de la habitación que se quiere reservar.',
    example: '321e4567-e89b-12d3-a456-426614174999',
  })
  @IsString()  
  @IsNotEmpty({ message: 'El ID de la habitación es requerido.' })
  roomId: string;


  /**
   * Fecha de check-in para la reservación.
   */
  @ApiProperty({
    description: 'Fecha de check-in para la reservación.',
    example: '2024-12-25T14:00:00.000Z',
    type: String, 
    format: 'date-time',
  })
  @IsNotEmpty({ message: 'La fecha de check-in es requerida.' })
  @IsDate({ message: 'La fecha de check-in debe ser válida.' })
  @Type(() => Date)
  checkInDate: Date;


  /**
   * Fecha de check-out para la reservación.
   */
  @ApiProperty({
    description: 'Fecha de check-out para la reservación.',
    example: '2024-12-30T11:00:00.000Z',
    type: String, 
    format: 'date-time',
  })
  @IsNotEmpty({ message: 'La fecha de check-out es requerida.' })
  @IsDate({ message: 'La fecha de check-out debe ser válida.' })
  @Type(() => Date)
  checkOutDate: Date;

  @Validate(CheckInBeforeCheckOut, { message: 'La fecha de check-in debe ser anterior a la fecha de check-out.' })
  checkInBeforeCheckOut: boolean; 
}
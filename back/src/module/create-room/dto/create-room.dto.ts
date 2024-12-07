import { IsString, IsNumber, IsNotEmpty, IsPositive, Matches, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {

    /**
   * Título o nombre de la habitación.
   * @example "Habitación Deluxe"
   */
   @ApiProperty({
      example: 'Habitación Deluxe',
      description: 'Título o nombre de la habitación.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;


   /**
   * Tamaño de la habitación.
   * @example "50m²"
   */
   @ApiProperty({
    example: '50m²',
    description: 'Tamaño de la habitación.',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+m²$/, { message: 'El tamaño debe estar en formato como "50m²".' })
  size: string;


  /**
   * Número de camas en la habitación.
   * @example 2
   */
  @ApiProperty({
    example: 2,
    description: 'Número de camas en la habitación.',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  @Max(4)
  beds: number;


   /**
   * Calificación promedio de la habitación.
   * @example 4.5
   */
   @ApiProperty({
    example: 4.5,
    description: 'Calificación promedio de la habitación.',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;

/**
   * Imagen representativa de la habitación (archivo).
   * @example "file.jpg"
   */
   @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Imagen representativa de la habitación (archivo).',
  })  image: any;


  /**
   * Precio de la habitación por noche.
   * @example 200.50
   */
  @ApiProperty({
    example: 200.5,
    description: 'Precio de la habitación por noche.',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;


  /**
   * Tipo de habitación asociada.
   * @example "d230c7d9-b983-4e78-b846-944dbe62d7b1"
   */
  @ApiProperty({
    example: 'd230c7d9-b983-4e78-b846-944dbe62d7b1',
    description: 'Tipo de habitación asociada.',
  })
  @IsString()
  @IsNotEmpty()
  roomType: string;
  

  /**
   * Descripción detallada de la habitación.
   * @example "Habitación espaciosa con vistas al mar y todas las comodidades modernas."
   */
  @ApiProperty({
    example: 'Habitación espaciosa con vistas al mar y todas las comodidades modernas.',
    description: 'Descripción detallada de la habitación.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

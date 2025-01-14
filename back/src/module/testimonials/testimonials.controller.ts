import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { TestimonialStatus } from '../../enums/testimonial-status.enum';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Autenticación JWT obligatoria
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Crear un nuevo testimonio' })
  @ApiResponse({ status: 201, description: 'Testimonio creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error de validación' })
  async create(@Body() createTestimonialDto: CreateTestimonialDto, @Req() req: any){
    const userId = req.user.id; // Extrae el ID del token JWT
    return this.testimonialsService.create(createTestimonialDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Autenticación JWT obligatoria
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los testimonios' })
  @ApiResponse({ status: 200, description: 'Listado de testimonios' })
  async findAll() {
    return this.testimonialsService.findAll();
  }

  @Get('published')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener testimonios publicados' })
  @ApiResponse({ status: 200, description: 'Listado de testimonios publicados' })
  async findPublished() {
    return this.testimonialsService.findByStatus(TestimonialStatus.PUBLISHED);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Autenticación JWT obligatoria
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un testimonio por ID' })
  @ApiResponse({ status: 200, description: 'Testimonio encontrado' })
  @ApiResponse({ status: 404, description: 'Testimonio no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Autenticación JWT obligatoria
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Actualizar un testimonio' })
  @ApiResponse({ status: 200, description: 'Testimonio actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Testimonio no encontrado' })
  async update(@Param('id') id: string, @Body('message') message: string) {
    return this.testimonialsService.update(id, message);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Autenticación JWT obligatoria
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un testimonio' })
  @ApiResponse({ status: 204, description: 'Testimonio eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Testimonio no encontrado' })
  async remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard) // Autenticación JWT obligatoria
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Cambiar el estatus de un testimonio' })
  @ApiResponse({ status: 200, description: 'Estatus del testimonio actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Testimonio no encontrado' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TestimonialStatus,
  ) {
    return this.testimonialsService.updateStatus(id, status);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from '../../entities/Testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { User } from '../../entities/User.entity';
import { TestimonialStatus } from '../../enums/testimonial-status.enum';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTestimonialDto: CreateTestimonialDto, userId: string): Promise<Testimonial> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const testimonial = this.testimonialRepository.create({
      testimonial: createTestimonialDto.message,
      rating: createTestimonialDto.rating,
      status: TestimonialStatus.PENDING,
      user,
      username: user.name,
      email: user.email,
    });

    return await this.testimonialRepository.save(testimonial);
  }

  async findAll(): Promise<Testimonial[]> {
    return await this.testimonialRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!testimonial) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }

    return testimonial;
  }

  async update(id: string, message: string): Promise<Testimonial> {
    const testimonial = await this.findOne(id);

    testimonial.testimonial = message;

    return await this.testimonialRepository.save(testimonial);
  }

  async remove(id: string): Promise<void> {
    const testimonial = await this.findOne(id);
    await this.testimonialRepository.remove(testimonial);
  }

  async updateStatus(id: string, status: TestimonialStatus): Promise<Testimonial> {
    const testimonial = await this.findOne(id);
  
    testimonial.status = status;
  
    return await this.testimonialRepository.save(testimonial);
  }
  
  async findByStatus(status: TestimonialStatus): Promise<Testimonial[]> {
    return await this.testimonialRepository.find({ where: { status }, relations: ['user'] });
  }

}

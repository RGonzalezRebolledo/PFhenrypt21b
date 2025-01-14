import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryConfig } from '../../config/cloudinary';
import { ImageValidatorPipe } from '../../pipes/imageValidatorPipe';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';


@Module({
  imports: [ConfigModule],
  providers: [FilesService, CloudinaryConfig, ImageValidatorPipe],
  controllers: [FilesController],
  exports: [FilesService]
})
export class FilesModule {}

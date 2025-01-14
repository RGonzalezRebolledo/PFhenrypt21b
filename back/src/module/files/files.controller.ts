import { Controller, Param, UploadedFile, Body, UsePipes} from '@nestjs/common';
import { Post, UseInterceptors, Get, Put, UseGuards, } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageValidatorPipe } from '../../pipes/imageValidatorPipe';
import { FilesService } from './files.service';
import { postImagesSchema, replaceImageSchema, updateMetadataSchema } from './files.swagger.schemas';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { Roles } from '../../decorators/roles/roles.decorator';

@Controller('files')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class FilesController {
  constructor(
    private readonly filesService: FilesService) {}
  @ApiTags('Files')


  @Post('uploadImage')
  @UsePipes(ImageValidatorPipe)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody(postImagesSchema)
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.filesService.uploadImage(file)
    return { url: result.secure_url, public_id: result.public_id };
  }


  @Get('images/:query')
  async getImages(@Param('query') query: string) {
    const images = await this.filesService.getImages(query);
    return images;
  }

  
  @Put('updateImageMetaData')
  @ApiBody(updateMetadataSchema)
  async updateImageMetaData(@Body() body: { public_id: string; metadata: Record<string, string> }) {
    const updatedImage = await this.filesService.updateImageMetadata(body.public_id, body.metadata);
    return updatedImage;
}


  @Put('replaceImage')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody(replaceImageSchema)
  async replaceImage(
  @UploadedFile(new ImageValidatorPipe()) file: Express.Multer.File,
    @Body('public_id') public_id: string,
    ) {
    if (!public_id) {
     throw new Error('El public_id es obligatorio');
    }

    const result = await this.filesService.replaceImage(file, public_id);
    return { url: result.secure_url, public_id: result.public_id };
  }
}
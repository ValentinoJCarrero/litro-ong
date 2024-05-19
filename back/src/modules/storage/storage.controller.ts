import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { StorageService } from './storage.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Storage')
@Controller('Storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 3000000, message: 'El archivo debe ser menor a 3mb.' }),
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|jfif|webp)$/ })
      ]
    })
  ) file: Express.Multer.File): Promise<string> {
      return await this.storageService.uploadImage(file);
  }
}

import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
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
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    const allowedMimeTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/jfif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only image files are allowed!');
    }
    try {
      const url = await this.storageService.uploadImage(file);
      return  url ;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
}

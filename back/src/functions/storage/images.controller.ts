import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator} from 'firebase/auth';
import { connectStorageEmulator, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from '../../config/storageConfig';

@Controller('images')
export class ImagesController {
  private storageRef;

  constructor() {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const storage = getStorage();

    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'localhost') {
        connectAuthEmulator(auth, 'http://127.0.0.1:9099');
        connectStorageEmulator(storage, '127.0.0.1', 9199);
      }
    }
     this.storageRef = ref(storage);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File):Promise<{ url: string }> {
    try {
      const snapshot = await uploadBytes(ref(this.storageRef, 'images/' + file.originalname), file.buffer);
      const url = await getDownloadURL(snapshot.ref);
      return { url };
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storageRef } from 'src/config/storageConfig';

@Injectable()
export class StorageService {
  constructor() {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const snapshot = await uploadBytes(ref(storageRef, 'images/' + file.originalname), file.buffer);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator, getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from '../../config/storageConfig';

@Injectable()
export class StorageService {
  private storageRef;

  constructor() {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const storage = getStorage();

    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099');
      connectStorageEmulator(storage, '127.0.0.1', 9199);
    }

    this.storageRef = ref(storage);
  }

  async uploadImage(file: Express.Multer.File): Promise<{ url: string }> {
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

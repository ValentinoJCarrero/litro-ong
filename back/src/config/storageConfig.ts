import { config as dotenvconfig } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

dotenvconfig({ path: '.env' });

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH,
  projectId: process.env.FB_PROJID,
  storageBucket: process.env.FB_BUCKET,
  messagingSenderId: process.env.FB_SENDER,
  appId: process.env.FB_APPID,
};

initializeApp(firebaseConfig);

const storage = getStorage();
export const storageRef = ref(storage);
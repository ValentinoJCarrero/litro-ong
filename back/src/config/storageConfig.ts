import { config as dotenvconfig } from 'dotenv';
dotenvconfig({ path: '.env' });
export const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH,
  projectId: process.env.FB_PROJID,
  storageBucket: process.env.FB_BUCKET,
  messagingSenderId: process.env.FB_SENDER,
  appId: process.env.FB_APPID,
};

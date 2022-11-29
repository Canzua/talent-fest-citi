import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCaNoB6Z2c9Sng5aMoVDxRm8IX0lF6JKP4',
  authDomain: 'citi-shop-c955b.firebaseapp.com',
  projectId: 'citi-shop-c955b',
  storageBucket: 'citi-shop-c955b.appspot.com',
  messagingSenderId: '851557419207',
  appId: '1:851557419207:web:fa49470d3443b71f5f16e2',
  measurementId: 'G-K7NS6KPMBF',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyARYAz2bUXqFLR4oVsdGffQhd5-8LNzHaA',
  authDomain: 'miniblog-d5700.firebaseapp.com',
  projectId: 'miniblog-d5700',
  storageBucket: 'miniblog-d5700.appspot.com',
  messagingSenderId: '696261997554',
  appId: '1:696261997554:web:4f73973761c5991bddf16b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

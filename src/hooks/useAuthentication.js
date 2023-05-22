import { useState, useEffect } from 'react';
import { FirebaseError } from '@firebase/util';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { db } from '../firebase/config';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Clean up - deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkCancelled() {
    if (cancelled) return;
  }

  // Creating user
  const createUser = async (data) => {
    setError(null);
    checkCancelled();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);
      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes('password')) {
        systemErrorMessage = 'Passoword needs to be at least 6 characters long';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'Email already exists';
      } else {
        systemErrorMessage = 'Unknown error, try again later';
      }
      setError(systemErrorMessage);

      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
  };
};

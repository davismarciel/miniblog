import { useState, useEffect } from 'react';
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
  const auth = getAuth();

  // Clean up - deal with memory leak
  const [cancelled, setCancelled] = useState(false);
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
        systemErrorMessage = 'Password needs to be at least 6 characters long';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'Email already exists';
      } else {
        systemErrorMessage = 'Unknown error, try again later';
      }
      setError(systemErrorMessage);

      setLoading(false);
    }
  };

  // Sign out user
  const logout = () => {
    checkCancelled();

    signOut(auth);
  };

  // Logging user
  const login = async (data) => {
    checkCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage = '';

      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'User not found';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Wrong passoword';
      } else if (error.message.includes('too-many-requests')) {
        systemErrorMessage = 'Too many attempts were made, please wait a few minutes before you try again';
      } else {
        systemErrorMessage = 'Unknown error, try again later';
      }

      setLoading(false);

      setError(systemErrorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};

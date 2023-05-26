import { useState, useEffect } from 'react';
import {
  doc, getDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useDocumentId = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setLoading(false);
        setDocument(docSnap.data());
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    }
    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};

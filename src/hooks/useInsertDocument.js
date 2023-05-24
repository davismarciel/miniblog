import { useState, useEffect, useReducer } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
  loading: null,
  error: null,
};

// Actions of reducer
const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'INSERTED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Function to post the document
export const useInsertDocument = (docColection) => {
  // Function that deals with reducer events and initial state
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // Deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const dealLeakBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    dealLeakBeforeDispatch({
      type: 'LOADING',
    });
    try {
      // Creating document and time where was created
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docColection),
        newDocument,
      );

      dealLeakBeforeDispatch({
        type: 'INSERTED_DOC',
        payload: insertedDocument,
      });
    } catch (error) {
      dealLeakBeforeDispatch({
        type: 'ERROR',
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return setCancelled(true);
  }, []);

  return { insertDocument, response };
};

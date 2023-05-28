import { useState, useEffect, useReducer } from 'react';
import { updateDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
  loading: null,
  error: null,
};

// Actions of reducer
const updateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'UPDATED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Function to post the document
export const useUpdateDocument = (docColection) => {
  // Function that deals with reducer events and initial state
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // Deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const dealLeakBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    dealLeakBeforeDispatch({
      type: 'LOADING',
    });

    try {
      const docRef = await doc(db, docColection, id);

      const updatedDocument = await updateDoc(docRef, data);

      dealLeakBeforeDispatch({
        type: 'UPTDATED_DOC',
        payload: updatedDocument,
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

  return { updateDocument, response };
};

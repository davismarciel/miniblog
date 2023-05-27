import { useState, useEffect, useReducer } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const initialState = {
  loading: null,
  error: null,
};

// Actions of reducer
const deleteReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'DELETED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Function to post the document
export const useDeleteDocument = (docColection) => {
  // Function that deals with reducer events and initial state
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // Deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const dealLeakBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    dealLeakBeforeDispatch({
      type: 'LOADING',
    });

    try {
      // Deleting document and time where was created
      const deletedDocument = await deleteDoc(doc(db, docColection, id));

      dealLeakBeforeDispatch({
        type: 'DELETED_DOC',
        payload: deletedDocument,
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

  return { deleteDocument, response };
};

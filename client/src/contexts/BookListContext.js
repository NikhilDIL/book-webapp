import React, { createContext, useReducer } from 'react';
import { bookListReducer } from '../reducers/bookListReducer';
import axios from 'axios';

export const BookListContext = createContext();

const BookListState = (props) => {
    const [state, dispatch] = useReducer(bookListReducer, {
      favorites: [],
      readingList: [],
      finishedList: []
    });

    const addFavorites = async data => {
      const res = await axios.post('/api/books', data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      dispatch({type: 'ADD_FAVORITE', payload: res.data});
    }

    const addReadingList = async data => {
      const res = await axios.post('/api/books', data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      dispatch({type: 'ADD_READINGLIST', payload: res.data});
    }

    const addFinishedList = async data => {
      const res = await axios.post('/api/books', data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      dispatch({type: 'ADD_FINISHEDLIST', payload: res.data});
    }

    return (
      <BookListContext.Provider value={{ state, addFavorites, addReadingList, addFinishedList }}>
        {props.children}
      </BookListContext.Provider>
    );
}

export default BookListState;
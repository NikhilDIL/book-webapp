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

    // add updateToReading and updateToFinished

    const updateToFinished = async (data, userid, bookid) => {
      const res = await axios.put(`/api/books/${userid}/${bookid}`, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      dispatch({type: 'UPDATE_FINISHED', payload: res.data});
    }

    const getUserBooks = async () => {
      const notRead = await axios.get('/api/books/not-read');
      const read = await axios.get('/api/books/read');
      const favorites = await axios.get('/api/books/favorite');
      dispatch({type: 'GET_USER_BOOKS', payload: {notRead: notRead.data, read: read.data, favorites: favorites.data}});
    }

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
      <BookListContext.Provider value={{ state, addFavorites, addReadingList, addFinishedList, getUserBooks, updateToFinished }}>
        {props.children}
      </BookListContext.Provider>
    );
}

export default BookListState;
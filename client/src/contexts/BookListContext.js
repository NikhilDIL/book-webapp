import React, { createContext, useReducer } from 'react';
import { bookListReducer } from '../reducers/bookListReducer';
import axios from 'axios';

export const BookListContext = createContext();

const BookListState = (props) => {
    const [state, dispatch] = useReducer(bookListReducer, {
      favorites: [],
      readingList: [],
      finishedList: [],
      filtered: null,
      error: {}
    });

    const clearFilter = () => {
      dispatch({type: 'CLEAR_FILTER'});
    }

    const searchUserBooks = (booksType, query) => {
      switch(booksType) {
        case 'readingList':
            dispatch({type: 'SEARCH_READING_LIST', payload: query});
            break;
        case 'finishedList':
            dispatch({type: 'SEARCH_FINISHED_LIST', payload: query});
            break;
        case 'favorites':
            dispatch({type: 'SEARCH_FAVORITES', payload: query});
            break;
        default:
            return;
      }
    }

    const removeUserBook = async bookid => {
      await axios.delete(`/api/books/${bookid}`);
      dispatch({type: 'REMOVE_BOOK', payload: bookid})
    }

    const doesUserHaveBook = async (bookid) => {
        const res = await axios.get(`/api/books/book/${bookid}`);
        if (!res.data[0]) {
          return false;
        }
        return true;
    }

    // add updateToReading and updateToFavorite
    const updateToReading = async (data, userid, bookid) => {
      const res = await axios.put(`/api/books/${userid}/${bookid}`, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      dispatch({type: 'UPDATE_READING', payload: res.data});
    }

    const updateToFavorite = async (data, userid, bookid) => {
      const res = await axios.put(`/api/books/${userid}/${bookid}`, data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      dispatch({type: 'UPDATE_FAVORITE', payload: res.data});
    }

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
      try {
        const res = await axios.post('/api/books', data, {
          headers: {
              'Content-Type': 'application/json'
          }
        });
        dispatch({type: 'ADD_READINGLIST', payload: res.data});
      } catch (err) {
        dispatch({type: 'ADD_DB_ERROR'});
      }
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
      <BookListContext.Provider value={{ 
          state, 
          addFavorites, 
          addReadingList, 
          addFinishedList, 
          getUserBooks, 
          updateToFinished, 
          updateToFavorite, 
          updateToReading,
          doesUserHaveBook,
          removeUserBook,
          searchUserBooks,
          clearFilter
       }}>
        {props.children}
      </BookListContext.Provider>
    );
}

export default BookListState;
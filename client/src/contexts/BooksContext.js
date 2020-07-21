import React, { createContext, useReducer } from 'react';
import { booksReducer } from '../reducers/booksReducer';
import axios from 'axios';

export const BooksContext = createContext();

const BooksState = (props) => {
    const [state, dispatch] = useReducer(booksReducer, {
      books: [],
      book: {},
      currentIndex: 0,
      searchQuery: ''
    });

    const clearBook = () => dispatch({type: 'CLEAR_BOOK'});

    const getBookInfo = async id => {
      clearBook();
      const res = await axios.get(`/api/googleapi/${id}`);
      dispatch({
        type: 'GET_BOOK',
        payload: JSON.parse(res.data)
      });
    }

    const setIndex = (idx) => {
      dispatch({
        type: 'SET_INDEX',
        payload: idx
      });
    }

    const setSearchQuery = (q) => {
      dispatch({
        type: 'SET_SEARCH_QUERY',
        payload: q
      });
    }
 
    const searchBooks = async () => {
      const { searchQuery } = state;
      let res = await axios.get(`/api/googleapi/${searchQuery}/0`);
      res = JSON.parse(res.data)
      let temp = [];
      for (let i = 0; i < Math.min(40, res.totalItems); i+=40) {
        temp.push(`/api/googleapi/${searchQuery}/${i}`);
      }
      const thing = await Promise.all(temp.map(item => axios.get(item)));
      const books = thing.map(obj => (JSON.parse(obj.data)).items)[0];
      dispatch({
        type: 'SEARCH_BOOKS',
        payload: books
      });
    }

    return (
      <BooksContext.Provider value={{ state, setIndex, searchBooks, setSearchQuery, getBookInfo }}>
        {props.children}
      </BooksContext.Provider>
    );
}

export default BooksState;
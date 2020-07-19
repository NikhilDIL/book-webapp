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
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_API_KEY}`);
      dispatch({
        type: 'GET_BOOK',
        payload: res.data
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
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40&key=`+process.env.REACT_APP_API_KEY);
      // console.log(res.data.totalItems);
      let temp = [];
      for (let i = 0; i < Math.min(40, res.data.totalItems); i+=40) {
        temp.push(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${i}&maxResults=40&key=`+process.env.REACT_APP_API_KEY);
      }
      const thing = await Promise.all(temp.map(item => axios.get(item)));
      const books = [].concat.apply([], thing.map(t => t.data.items));
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
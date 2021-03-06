import React, { createContext, useReducer } from 'react';
import { booksReducer } from '../reducers/booksReducer';
import axios from 'axios';

export const BooksContext = createContext();

const BooksState = (props) => {
    const [state, dispatch] = useReducer(booksReducer, {
      books: [],
      book: {},
      currentIndex: 0,
      searchQuery: '',
      loading: false
    });

    const clearBooks = () => dispatch({type: 'CLEAR_BOOKS'});

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
      let books = thing.map(obj => (JSON.parse(obj.data)).items);
      books = [].concat.apply([], books);
      
      // remove duplicates
      let hashmap = new Map();
      let filteredBooks = [];
      books.forEach(book => {
        if (!hashmap.get(book.id)) {
          hashmap.set(book.id, true);
          filteredBooks.push(book);
        }
      });

      dispatch({
        type: 'SEARCH_BOOKS',
        payload: filteredBooks
      });
    }

    return (
      <BooksContext.Provider value={{ state, setIndex, searchBooks, setSearchQuery, getBookInfo, clearBooks }}>
        {props.children}
      </BooksContext.Provider>
    );
}

export default BooksState;
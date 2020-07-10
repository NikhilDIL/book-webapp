import React, { createContext, useReducer } from 'react';
import { booksReducer } from '../reducers/booksReducer';
import axios from 'axios';

export const BooksContext = createContext();

const BooksState = (props) => {
    const [books, dispatch] = useReducer(booksReducer, []);

    const searchBooks = async () => {
      const res = await axios.get("https://www.googleapis.com/books/v1/volumes?q=flowers&startIndex=2&maxResults=10&key="+process.env.REACT_APP_API_KEY);
      dispatch({
        type: 'SEARCH_BOOKS',
        payload: res.data.items
      });
    }

    return (
      <BooksContext.Provider value={{ books, searchBooks }}>
        {props.children}
      </BooksContext.Provider>
    );
}

export default BooksState;
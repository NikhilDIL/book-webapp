import React, { createContext, useReducer } from 'react';
import { bookListReducer } from '../reducers/bookListReducer';

export const BookListContext = createContext();

const BookListState = (props) => {
    const [booksList, dispatch] = useReducer(bookListReducer, []);
    return (
      <BookListContext.Provider value={{ booksList, dispatch }}>
        {props.children}
      </BookListContext.Provider>
    );
}

export default BookListState;
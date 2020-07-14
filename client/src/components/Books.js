import React, { useContext } from 'react';
import BookInfo from '../components/BookInfo';
import { BooksContext } from '../contexts/BooksContext';
import '../css/books.css';

const Books = ({ books }) => {
    const { state: {currentIndex}} = useContext(BooksContext);
    return (
        <div className="container books-grid">
            {books.slice(currentIndex, currentIndex+8).map(book => <BookInfo key={book.id} book={book}/>)}
        </div>
    );
}

export default Books;

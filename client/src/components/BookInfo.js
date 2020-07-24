import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../contexts/BooksContext';
import { BookListContext } from '../contexts/BookListContext';
import '../css/bookInfo.css';

const BookInfo = ({ book }) => {
    const booksContext = useContext(BooksContext);
    const bookListContext = useContext(BookListContext);
    const { getBookInfo } = booksContext;
    const { addReadingList } = bookListContext;
    const srcImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "";

    const onClick = e => {
        getBookInfo(book.id);
    }

    const addToReadingList = e => {
        addReadingList({
            bookId: book.id,
            bookImg: srcImg,
            bookname: book.volumeInfo.title,
            category: 'not-read'
        });
    }

    return (
        <div className="bookinfo-border">
            <h5 style={{textAlign: "center"}}>{book.volumeInfo.title}</h5>
            <Link to={`/book/${book.id}`} onClick={onClick}><img src={srcImg} alt="bookPicture" className="bookinfo-img"/></Link>
            <button type="button" onClick={addToReadingList} className="btn btn-dark btn-block">
                Add To Reading List
            </button>
        </div>
    );
}

export default BookInfo;
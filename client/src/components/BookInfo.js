import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../contexts/BooksContext';
import '../css/bookInfo.css';

const BookInfo = ({ book }) => {
    const booksContext = useContext(BooksContext);
    const { getBookInfo } = booksContext;
    const srcImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "";

    const onClick = (e) => {
        getBookInfo(book.id);
    }

    return (
        <div className="bookinfo-border">
            <h5 style={{textAlign: "center"}}>{book.volumeInfo.title}</h5>
            <Link to={`/book/${book.id}`} onClick={onClick}><img src={srcImg} alt="bookPicture" className="bookinfo-img"/></Link>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info"><i className="fa fa-star" aria-hidden="true"/></button>
                <button type="button" className="btn btn-info"><i className="fa fa-list" aria-hidden="true"/></button>
                <button type="button" className="btn btn-info"><i className="fa fa-book" aria-hidden="true"/></button>
            </div>
        </div>
    );
}

export default BookInfo;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../contexts/BooksContext';
import { BookListContext } from '../contexts/BookListContext';
import { AuthContext } from '../contexts/AuthContext';
import '../css/bookInfo.css';

const AccountBookInfo = ({ book }) => {
    const { getBookInfo } = useContext(BooksContext);
    const { state: { user } } = useContext(AuthContext);
    const { updateToFinished, updateToFavorite, updateToReading, removeUserBook } = useContext(BookListContext);
 
    const onClick = e => {
        getBookInfo(book.bookId);
    }
    const updateFinished = e => {updateToFinished({category: "read"}, user._id, book.bookId);}
    const updateFavorite = e => {updateToFavorite({category: "favorite"}, user._id, book.bookId);}
    const updateReading = e => {updateToReading({category: "not-read"}, user._id, book.bookId);}
    const removeBook = e => {removeUserBook(book.bookId);}

    return (
        <div className="bookinfo-border mb-2">
            <h5 style={{textAlign: "center"}}>{book.bookname}</h5>
            <Link to={`/book/${book.bookId}`} onClick={onClick}><img src={book.bookImg} alt="bookPicture" className="bookinfo-img"/></Link>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button onClick={updateReading}
                type="button" 
                className="btn btn-info" 
                data-toggle="tooltip" 
                data-placement="top" 
                title="Add to reading list">
                    <i className="fas fa-book-open"/>
                </button>
                <button onClick={updateFinished}
                type="button" 
                className="btn btn-info" 
                data-toggle="tooltip" 
                data-placement="top" 
                title="Mark as finished">
                    <i className="fas fa-book"/>
                </button>
                <button onClick={updateFavorite}
                type="button" 
                className="btn btn-info" 
                data-toggle="tooltip" 
                data-placement="top" 
                title="Add to favorites">
                    <i className="fas fa-star"/>
                </button>
                <button onClick={removeBook}
                type="button" 
                className="btn btn-danger" 
                data-toggle="tooltip" 
                data-placement="top" 
                title="Remove Book">
                    <i className="fa fa-times" aria-hidden="true"/>
                </button>
            </div>
        </div>
    )
}

export default AccountBookInfo;

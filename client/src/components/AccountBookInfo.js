import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../contexts/BooksContext';
import '../css/bookInfo.css';

const AccountBookInfo = ({ book }) => {
    const { getBookInfo } = useContext(BooksContext);
 
    const onClick = e => {
        getBookInfo(book.bookId);
    }

    return (
        <div className="bookinfo-border mb-2">
            <h5 style={{textAlign: "center"}}>{book.bookname}</h5>
            <Link to={`/book/${book.bookId}`} onClick={onClick}><img src={book.bookImg} alt="bookPicture" className="bookinfo-img"/></Link>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top" title="Add to reading list"><i class="fas fa-book-open"/></button>
                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top" title="Mark as finished"><i class="fas fa-book"/></button>
                <button type="button" className="btn btn-info" data-toggle="tooltip" data-placement="top" title="Add to favorites"><i class="fas fa-star"/></button>
            </div>
        </div>
    )
}

export default AccountBookInfo;

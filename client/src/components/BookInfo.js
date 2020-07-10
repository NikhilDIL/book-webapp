import React from 'react';
import '../css/bookInfo.css';

const BookInfo = ({ book }) => {
    const srcImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "";
    return (
        <div className="bookinfo-border">
            <h5 style={{textAlign: "center"}}>{book.volumeInfo.title}</h5>
            <img src={srcImg} alt="bookPicture" className="bookinfo-img"/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info"><i class="fa fa-star" aria-hidden="true"/></button>
                <button type="button" class="btn btn-info"><i class="fa fa-list" aria-hidden="true"/></button>
                <button type="button" class="btn btn-info"><i class="fa fa-book" aria-hidden="true"/></button>
            </div>
        </div>
    );
}

export default BookInfo;
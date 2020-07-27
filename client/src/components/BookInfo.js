import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../contexts/BooksContext';
import { BookListContext } from '../contexts/BookListContext';
import '../css/bookInfo.css';

const BookInfo = ({ book }) => {
    const booksContext = useContext(BooksContext);
    const bookListContext = useContext(BookListContext);
    const [userHasBook, setUserHasBook] = useState(false);
    const [buttonProps, setButtonProps] = useState({msg: 'Add to Reading List', style: 'btn btn-dark btn-block'});
    const [bookAdded, setBookAdded] = useState(false);
    const { getBookInfo } = booksContext;
    const { doesUserHaveBook, addReadingList, state: { error } } = bookListContext;
    const srcImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "";

    useEffect(() => {
        doesUserHaveBook(book.id)
            .then(res => {
                if (res) setUserHasBook(true);
            })
        // eslint-disable-next-line
    }, [])

    const onClick = e => {
        getBookInfo(book.id);
    }

    const addToReadingList = e => {
        if (userHasBook) {
            setButtonProps({msg: 'Book Exists in Account Page', style: 'btn btn-secondary btn-block'});
            return;
        }
        addReadingList({
            bookId: book.id,
            bookImg: srcImg,
            bookname: book.volumeInfo.title,
            category: 'not-read'
        });
        setBookAdded(true);
    }

    return (
        <div className="bookinfo-border">
            <h5 style={{textAlign: "center"}}>{book.volumeInfo.title}</h5>
            <Link to={`/book/${book.id}`} onClick={onClick}><img src={srcImg} alt="bookPicture" className="bookinfo-img"/></Link>
            {bookAdded ? (<div className="btn btn-success btn-block">Book Added to List</div>) : (<button type="button" onClick={addToReadingList} className={buttonProps.style}>
                {buttonProps.msg}
            </button>)}
            
        </div>
    );
}

export default BookInfo;
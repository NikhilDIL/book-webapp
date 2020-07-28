import React, { Fragment, useContext, useEffect, useState } from 'react';
import Navbar from'../components/Navbar';
import { BooksContext } from '../contexts/BooksContext';
import { AuthContext } from '../contexts/AuthContext';
import { BookListContext } from '../contexts/BookListContext';

const Book = ({ match }) => {
    const { state: { book }, getBookInfo } = useContext(BooksContext);
    const [userHasBook, setUserHasBook] = useState(false);
    const [buttonProps, setButtonProps] = useState({msg: 'Add to Reading List', style: 'btn btn-dark btn-block'});
    const [bookAdded, setBookAdded] = useState(false);
    const { addReadingList, doesUserHaveBook } = useContext(BookListContext);
    const { loadUser } = useContext(AuthContext);

    useEffect(() => {
        loadUser();
        getBookInfo(match.params.id);
        doesUserHaveBook(match.params.id)
            .then(res => {
                if (res) setUserHasBook(true);
            })
        // eslint-disable-next-line
    }, []);

    const addToReadingList = e => {
        if (userHasBook) {
            setButtonProps({msg: 'Book Exists in Account Page', style: 'btn btn-secondary btn-block'});
            return;
        }
        const srcImg = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "";
        addReadingList({
            bookId: book.id,
            bookImg: srcImg,
            bookname: book.volumeInfo.title,
            category: 'not-read'
        });
        setBookAdded(true);
    }
    const { volumeInfo } = book;
    if (!volumeInfo) {
        return <div/>
    }
    return (
        <Fragment>
            <Navbar/>
            <div className="container mt-3">
                <div style={{display: "flex"}}>
                    <img 
                        src={volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ""} 
                        alt="bookPicture" 
                        className="bookinfo-img mr-5" 
                        style={{width: "200px", height: "250px"}}
                    />
                    <div>
                        <h2 style={{textAlign: "center"}}>{volumeInfo.title}</h2>
                        <div style={{display: "flex"}}>
                            <h5 className="mr-1" style={{display:"inline"}}>Authors: </h5>
                            <ul style={{listStyle: "none", padding: "0px"}}>
                                {volumeInfo.authors && volumeInfo.authors.map((author, index) => <li key={index}>{author}</li>)}
                            </ul>
                        </div>
                        <div style={{display: "flex"}}>
                            <h5 className="mr-1">Publisher: </h5>
                            <p>{volumeInfo.publisher}</p>
                        </div>
                        <div style={{width: "200px"}}>
                            {bookAdded ? (<div className="btn btn-success btn-block">Book Added to List</div>) : (<button type="button" onClick={addToReadingList} className={buttonProps.style}>
                                {buttonProps.msg}
                            </button>)}
                        </div>
                    </div>
                </div>
                
                <div className="card">
                    <h3 style={{fontWeight: "bold"}}>Description:</h3>
                    {volumeInfo.description ? volumeInfo.description.replace(/(<([^>]+)>)/ig, '') : "No Description Available"}
                </div>
            </div>
        </Fragment>
    )
}

export default Book;

import React, { useContext, useEffect } from 'react';
import Navbar from'../components/Navbar';
import { BooksContext } from '../contexts/BooksContext';

const Book = ({ match }) => {
    const booksContext = useContext(BooksContext);
    const { state: { book }, getBookInfo } = booksContext;

    useEffect(() => {
        getBookInfo(match.params.id);
        // eslint-disable-next-line
    }, []);

    const { volumeInfo } = book;

    if (!volumeInfo) {
        return <div/>
    }
    return (
        <div>
            <Navbar/>
            <h4>{volumeInfo.title}</h4>
            <img src={volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ""} alt="bookPicture" className="bookinfo-img"/>
            <ul>
                {volumeInfo.authors.map(author => <li key={book.id}>{author}</li>)}
            </ul>
            {volumeInfo.publisher}<br/>
            {volumeInfo.canonicalVolumeLink}
            <div>
                {volumeInfo.description.replace(/(<([^>]+)>)/ig, '')}
            </div>
        </div>
    )
}

export default Book;

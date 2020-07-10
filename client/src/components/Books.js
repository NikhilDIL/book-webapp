import React from 'react';
import BookInfo from '../components/BookInfo';

const Books = ({ books }) => {
    return (
        <div className="container" 
            style={{display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "1rem"}}>
            {books.map(book => <BookInfo key={book.id} book={book}/>)}
        </div>
    );
}

export default Books;

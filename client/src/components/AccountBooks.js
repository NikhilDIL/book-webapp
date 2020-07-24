import React from 'react';
import AccountBookInfo from './AccountBookInfo'

const AccountBooks = ({ books, currentIndex, setCurrentIndex }) => {
   const leftClick = e => {
       currentIndex === 0 ? setCurrentIndex(currentIndex) : setCurrentIndex(currentIndex-4);
   }
   const rightClick = e => {
       currentIndex+4 >= books.length ? setCurrentIndex(currentIndex) : setCurrentIndex(currentIndex+4);
   }
    return (
        <div className="container card">
            <div className="container" style={{display: "flex", justifyContent: "space-around"}}>
                {books.slice(currentIndex, currentIndex+4).map(book => <AccountBookInfo key={book.bookId} book={book}/>)}
            </div>
            <div className="btn-group container mb-2" 
            role="group" 
            aria-label="Basic example"
            style={{display: "flex"}}>
                <button onClick={leftClick} type="button" className="btn btn-dark"><i className="fa fa-arrow-left" aria-hidden="true"/></button>
                <button onClick={rightClick} type="button" className="btn btn-dark"><i className="fa fa-arrow-right" aria-hidden="true"/></button>
            </div>
        </div>
    );
}

export default AccountBooks;

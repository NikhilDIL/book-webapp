import React, { useContext, useState, useEffect } from 'react';
import AccountBookInfo from './AccountBookInfo';
import AccountSearch from './AccountSearch';
import { BookListContext } from '../contexts/BookListContext';
import '../css/account.css';

const AccountBooks = ({ booksType, currentIndex, setCurrentIndex }) => {
    const [displayList, setDisplayList] = useState([]);
    const { state: { readingList, finishedList, favorites, filtered } } = useContext(BookListContext);

    useEffect(() => {
        if (filtered !== null) {
            setCurrentIndex(0);
        }

        switch(booksType) {
            case 'readingList':
                setDisplayList(readingList);
                break;
            case 'finishedList':
                setDisplayList(finishedList);
                break;
            case 'favorites':
                setDisplayList(favorites);
                break;
            default:
                setDisplayList([]);
        }
    }, [booksType, readingList, finishedList, favorites, filtered, setCurrentIndex]);

    const leftClick = e => {
        currentIndex === 0 ? setCurrentIndex(currentIndex) : setCurrentIndex(currentIndex-4);
    }

    const rightClick = e => {
        currentIndex+4 >= (filtered !== null ? filtered.length : displayList.length) ? setCurrentIndex(currentIndex) : setCurrentIndex(currentIndex+4);
    }
    // console.log(filtered === []);
    return (
        <div className="container card mb-5">
            {displayList.length !== 0 && <AccountSearch booksType={booksType}/>}
            <div className="container accountBooks-display">
                {filtered !== null ? (filtered.slice(currentIndex, currentIndex+4).map(book => <AccountBookInfo key={book.bookId} book={book}/>)) 
                    : (displayList.slice(currentIndex, currentIndex+4).map(book => <AccountBookInfo key={book.bookId} book={book}/>))}
            </div>
            {displayList.length !== 0 && (<div className="btn-group container mb-2" 
            role="group" 
            aria-label="Basic example"
            style={{display: "flex"}}>
                <button onClick={leftClick} type="button" className="btn btn-dark"><i className="fa fa-arrow-left" aria-hidden="true"/></button>
                <button onClick={rightClick} type="button" className="btn btn-dark"><i className="fa fa-arrow-right" aria-hidden="true"/></button>
            </div>)}
            {displayList.length === 0 ? <div/> : (<div className="" style={{display: "flex", justifyContent: "center",
                fontSize: "20px", fontWeight: "bold"}}>
                {parseInt(currentIndex/4+1)+"/"+parseInt(Math.ceil((filtered !== null ? filtered.length : displayList.length)/4))}
            </div>)}
        </div>
    );
}

export default AccountBooks;

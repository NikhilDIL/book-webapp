import React, {Fragment, useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';

const Pagination = () => {
     const { state: {books, currentIndex}, setIndex } = useContext(BooksContext);

    const leftClick = (e) => {
        currentIndex !== 0 ? setIndex(currentIndex-8) : setIndex(0);
    }

    const rightClick = (e) => {
        currentIndex+8 >= books.length ? setIndex(currentIndex) : setIndex(currentIndex+8);
    }

    return (
        <Fragment>
            <div className="btn-group container mb-2" 
            role="group" 
            aria-label="Basic example"
            style={{display: "flex", justifyContent: "center"}}>
                <button onClick={leftClick} type="button" className="btn btn-dark"><i className="fa fa-arrow-left" aria-hidden="true"/></button>
                <button onClick={rightClick} type="button" className="btn btn-dark"><i className="fa fa-arrow-right" aria-hidden="true"/></button>
            </div>
            {books.length === 0 ? <div className="mb-5"></div> : (<div className="mb-5" style={{display: "flex", justifyContent: "center",
                fontSize: "20px", fontWeight: "bold"}}>
                {parseInt(currentIndex/8+1)+"/"+parseInt(books.length/8)}
            </div>)}
        </Fragment>
        
    );
}

export default Pagination;

import React, { Fragment, useContext, useEffect } from 'react';
import Navbar from'../components/Navbar';
import { BooksContext } from '../contexts/BooksContext';
import { AuthContext } from '../contexts/AuthContext';

const Book = ({ match }) => {
    const { state: { book }, getBookInfo } = useContext(BooksContext);
    const { loadUser } = useContext(AuthContext);

    useEffect(() => {
        loadUser();
        getBookInfo(match.params.id);
        // eslint-disable-next-line
    }, []);

    const { volumeInfo } = book;
    console.log(book);

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

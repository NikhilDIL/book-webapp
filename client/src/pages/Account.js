import React, { useEffect, useContext, useState, Fragment } from 'react';
import Navbar from'../components/Navbar';
import AccountBooks from '../components/AccountBooks';
import  UserProfileInfo from '../components/UserProfileInfo';
import { BookListContext } from '../contexts/BookListContext';
import { AuthContext } from '../contexts/AuthContext';

const Account = () => {
    const { loadUser } = useContext(AuthContext);
    const { getUserBooks } = useContext(BookListContext);
    const [displayType, setDisplayType] = useState('none');
    const [currentIndex, setCurrentIndex] = useState(0);
 
    useEffect(() => {
        loadUser();
        getUserBooks();
        // eslint-disable-next-line
    }, []);

    const displayFinished = e => {setDisplayType('finishedList'); setCurrentIndex(0);}
    const displayReading= e => {setDisplayType('readingList'); setCurrentIndex(0);}
    const displayFavorites = e => {setDisplayType('favorites'); setCurrentIndex(0);}

    return (
        <Fragment>
            <Navbar/>
            <h1 style={{textAlign: "center"}}>My Account</h1>
            <UserProfileInfo/>
            <div className="container">
                <div className="btn-group" 
                role="group" 
                aria-label="Basic example"
                style={{display: "flex", justifyContent: "center"}}>
                    <button className={displayType === 'readingList' ? "btn btn-dark" : "btn btn-info"} onClick={displayReading}>Reading</button>
                    <button className={displayType === 'finishedList' ? "btn btn-dark" : "btn btn-info"} onClick={displayFinished}>Finished</button>
                    <button className={displayType === 'favorites' ? "btn btn-dark" : "btn btn-info"} onClick={displayFavorites}>Favorites</button>
                </div>
                <AccountBooks booksType={displayType} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            </div>
        </Fragment>
    );
}

export default Account;

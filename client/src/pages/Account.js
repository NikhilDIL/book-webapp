import React, { useEffect, useContext, useState, Fragment } from 'react';
import Navbar from'../components/Navbar';
import AccountBooks from '../components/AccountBooks';
import  UserProfileInfo from '../components/UserProfileInfo';
import { BookListContext } from '../contexts/BookListContext';
import { AuthContext } from '../contexts/AuthContext';

const Account = () => {
    const { loadUser } = useContext(AuthContext);
    const { getUserBooks, state: { favorites, readingList, finishedList }} = useContext(BookListContext);
    const [displayType, setDisplayType] = useState({listType: [], listName: 'Reading List'});
    const [currentIndex, setCurrentIndex] = useState(0);
 
    useEffect(() => {
        loadUser();
        getUserBooks();
        // eslint-disable-next-line
    }, []);

    const displayFinished = e => { setDisplayType({listType: finishedList, listName: 'Finished Books'}); setCurrentIndex(0);}
    const displayReading= e => {setDisplayType({listType: readingList, listName: 'Reading List'}); setCurrentIndex(0);}
    const displayFavorites = e => {setDisplayType({listType: favorites, listName: 'Favorite Books'}); setCurrentIndex(0);}

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
                    <button className={displayType.listType === readingList ? "btn btn-dark" : "btn btn-info"} onClick={displayReading}>Reading</button>
                    <button className={displayType.listType === finishedList ? "btn btn-dark" : "btn btn-info"} onClick={displayFinished}>Finished</button>
                    <button className={displayType.listType === favorites ? "btn btn-dark" : "btn btn-info"} onClick={displayFavorites}>Favorites</button>
                </div>
                {/* {readingList === [] ? (<div> LOADING </div>) : (<AccountBooks books={displayType.listType} sectionName={displayType.listName}/>) } */}
                <AccountBooks books={displayType.listType} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            </div>
        </Fragment>
    );
}

export default Account;

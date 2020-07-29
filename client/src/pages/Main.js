import React, { useContext, useEffect } from 'react';
import Navbar from'../components/Navbar';
import SearchBar from '../components/SearchBar';
import Books from '../components/Books';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { BooksContext } from '../contexts/BooksContext';
import { AuthContext } from '../contexts/AuthContext';

const Main = () => {
    const { loadUser } = useContext(AuthContext);
    const { state } = useContext(BooksContext);
    
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Navbar/>
            <SearchBar/>
            {state.loading ? 
            <Spinner/> :
            (<div className="mt-5 mb-5" style={{display: "flex", justifyContent: "center"}}>
                <div>
                    <Books books={state.books}/>
                </div>
            </div>)}
            
            {state.books.length === 0 ? <div/> : <Pagination/>}
        </div>
    );
}

export default Main;
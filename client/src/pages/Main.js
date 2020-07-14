import React, { useContext } from 'react';
import Navbar from'../components/Navbar';
import SearchBar from '../components/SearchBar';
import Books from '../components/Books';
import Pagination from '../components/Pagination';
import { BooksContext } from '../contexts/BooksContext';

const Main = () => {
    const { state } = useContext(BooksContext);
    return (
        <div>
            <Navbar/>
            <SearchBar/>
            <div className="mt-5 mb-5" align="center">
                <Books books={state.books}/>
            </div>
            {state.books.length === 0 ? <div/> : <Pagination/>}
        </div>
    );
}

export default Main;
import React, { useContext } from 'react';
import Navbar from'../components/Navbar';
import SearchBar from '../components/SearchBar';
import Books from '../components/Books';
import { BooksContext } from '../contexts/BooksContext';

const Main = () => {
    const { books } = useContext(BooksContext);
    return (
        <div>
            <Navbar/>
            <SearchBar/>
            <div className="mt-5">
                <Books books={books}/>
            </div>
        </div>
    );
}

export default Main;
import React, { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';

const SearchBar = () => {
    const { state: {searchQuery}, searchBooks, setSearchQuery, setIndex} = useContext(BooksContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        await searchBooks(); // pass in parameter here
        setIndex(0);
        setSearchQuery('');
    }

    const onChange = (e) => {
        setSearchQuery(e.target.value);
    }
    return (
        <div className="container mt-3">
            <form onSubmit={onSubmit}>
                <input type="text"
                name="searchQuery"
                placeholder="Search Books..."
                value={searchQuery}
                className="btn-block p-1"
                onChange={onChange}>
                </input>
                <input type="submit"
                value="Search"
                className="btn btn-dark btn-block">
                </input>
            </form>
        </div>
    );
}

export default SearchBar;

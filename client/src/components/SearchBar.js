import React, { useState, useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';

const SearchBar = () => {
    const { searchBooks } = useContext(BooksContext);
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(text);
        searchBooks(); // pass in parameter here
        setText('');
    }

    const onChange = (e) => {
        setText(e.target.value);
    }
    return (
        <div className="container mt-3">
            <form onSubmit={onSubmit}>
                <input type="text"
                name="text"
                placeholder="Search Books..."
                value={text}
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

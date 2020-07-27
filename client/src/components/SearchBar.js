import React, { useContext, useState } from 'react';
import Alert from './Alert';
import { BooksContext } from '../contexts/BooksContext';

const SearchBar = () => {
    const { state: {searchQuery}, searchBooks, setSearchQuery, setIndex} = useContext(BooksContext);
    const [searchAlert, setSearchAlert] = useState({display: false, msg: ''});

    const onSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery === '') {
            setSearchAlert({display: true, msg: 'Please enter a non-empty query'});
            setTimeout(() => setSearchAlert({display: false, msg: ''}), 4000);
            return;
        }
        await searchBooks(); // pass in parameter here
        setIndex(0);
        setSearchQuery('');
    }

    const onChange = (e) => {
        setSearchQuery(e.target.value);
    }
    return (
        <div className="container mt-3">
            {searchAlert.display && <Alert msg={searchAlert.msg}/>}
            <form className="mt-3" onSubmit={onSubmit}>
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

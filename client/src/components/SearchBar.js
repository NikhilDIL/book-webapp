import React, { useState } from 'react';

const SearchBar = () => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(text);
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

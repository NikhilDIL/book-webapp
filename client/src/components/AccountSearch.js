import React, { useContext, useRef, useEffect } from 'react';
import { BookListContext } from '../contexts/BookListContext';

const AccountSearch = ({ booksType }) => {
    const query = useRef('');
    const { searchUserBooks, clearFilter, state: { listSwitch } } = useContext(BookListContext);

    useEffect(() => {
        query.current.value = '';
        // eslint-disable-next-line
    }, [listSwitch]);

    const onSubmit = e => {
        e.preventDefault();
    }

    const onChange = e => {
        if (query.current.value !== '') {
            searchUserBooks(booksType, e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="form-group" style={{width: "100%"}}>
                    <input 
                        ref={query}
                        type="text" 
                        name="query" 
                        className="form-control" 
                        placeholder="Search Books..."
                        onChange={onChange}
                    />
                </div>
            </div>
        </form>
    )
}

export default AccountSearch;
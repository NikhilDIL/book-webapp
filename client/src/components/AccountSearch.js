import React, { useContext, useRef, useEffect } from 'react';
import { BookListContext } from '../contexts/BookListContext';

const AccountSearch = ({ booksType }) => {
    // const [query, setQuery] = useState('');
    const query = useRef('');
    const { searchUserBooks, clearFilter } = useContext(BookListContext);
    // const onChange = e => {
    //     setQuery(e.target.value);
    // }
    // const onSubmit = e => {
    //     e.preventDefault();
    //     searchUserBooks(booksType, query);
    //     setQuery('');
    // }

    useEffect(() => {
        query.current.value = '';
        // eslint-disable-next-line
    }, []);

    const onChange = e => {
        if (query.current.value !== '') {
            searchUserBooks(booksType, e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form>
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
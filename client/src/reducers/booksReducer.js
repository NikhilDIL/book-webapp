export const booksReducer = (state, action) => {
    switch(action.type) {
        case 'SEARCH_BOOKS':
          return {
            ...state,
            books: action.payload,
            loading: false
          }
        case 'SET_INDEX':
          return {
            ...state,
            currentIndex: action.payload
          }
        case 'SET_SEARCH_QUERY':
          return {
            ...state,
            searchQuery: action.payload
          }
        case 'GET_BOOK':
          return {
            ...state,
            book: action.payload
          }
        case 'CLEAR_BOOK':
          return {
            ...state,
            book: {}
          }
        case 'CLEAR_BOOKS':
          return {
            ...state,
            books: [],
            loading: true
          }
        default:
          return state;
    }
}
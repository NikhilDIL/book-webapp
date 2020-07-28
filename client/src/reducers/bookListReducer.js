export const bookListReducer = (state, action) => {
    switch(action.type) {
        case 'GET_USER_BOOKS':
          return {
            ...state,
            finishedList: [...action.payload.read],
            readingList: [...action.payload.notRead],
            favorites: [...action.payload.favorites]
          }
        case 'UPDATE_FINISHED':
          return {
            ...state,
            finishedList: state.finishedList.some(book => book.bookId === action.payload.bookId) ? state.finishedList : [...state.finishedList, action.payload],
            readingList: state.readingList.filter(book => book.bookId !== action.payload.bookId),
            favorites: state.favorites.filter(book => book.bookId !== action.payload.bookId)
          }
        case 'UPDATE_FAVORITE':
          return {
            ...state,
            favorites: state.favorites.some(book => book.bookId === action.payload.bookId) ? state.favorites : [...state.favorites, action.payload],
            readingList: state.readingList.filter(book => book.bookId !== action.payload.bookId),
            finishedList: state.finishedList.filter(book => book.bookId !== action.payload.bookId)
          }
        case 'UPDATE_READING':
          return {
            ...state,
            readingList: state.readingList.some(book => book.bookId === action.payload.bookId) ? state.readingList : [...state.readingList, action.payload],
            favorites: state.favorites.filter(book => book.bookId !== action.payload.bookId),
            finishedList: state.finishedList.filter(book => book.bookId !== action.payload.bookId)
          }
        case 'REMOVE_BOOK':
          return {
            ...state,
            readingList: state.readingList.filter(book => book.bookId !== action.payload),
            favorites: state.favorites.filter(book => book.bookId !== action.payload),
            finishedList: state.finishedList.filter(book => book.bookId !== action.payload)

          }
        case 'ADD_FAVORITE':
          return {
            ...state,
            favorites: [...state.favorites, action.payload]
          }
        case 'ADD_READINGLIST':
          return {
            ...state,
            readingList: [...state.readingList, action.payload]
          }
        case 'ADD_FINISHEDLIST':
          return {
            ...state,
            finishedList: [...state.finishedList, action.payload]
          }
        case 'ADD_DB_ERROR':
          return {
            ...state,
            error: {msg: "Book already exists in one of your lists"}
          }
        default:
          return state;
    }
}
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
            finishedList: [...state.finishedList, action.payload],
            readingList: state.readingList.filter(book => book.bookId !== action.payload.bookId),
            favorites: state.favorites.filter(book => book.bookId !== action.payload.bookId)
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
        default:
          return state;
    }
}
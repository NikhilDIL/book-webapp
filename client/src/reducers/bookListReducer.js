export const bookListReducer = (state, action) => {
    switch(action.type) {
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
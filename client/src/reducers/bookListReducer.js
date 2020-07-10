export const bookListReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_BOOK_STATUS':
          return [];
        case 'REMOVE_BOOK':
          return [];
        default:
          return state;
    }
}
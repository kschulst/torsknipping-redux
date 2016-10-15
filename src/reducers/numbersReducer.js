const initialState = {
  selectedNumbers: []
};

export default function numbersReducer(state = initialState, action) {
  switch(action.type){
    case 'SELECT_NUMBER':
      return state.selectedNumbers.includes(action.number)
        ? {...state,
          selectedNumbers: state.selectedNumbers.filter((num) => num !== action.number)
          }
        : state.selectedNumbers.length <= 6
            ? {...state,
              selectedNumbers: [...state.selectedNumbers, action.number].sort((a, b) => a - b)}
            : {...state};
    case 'RESET_NUMBERS':
      return {
        ...state,
        selectedNumbers: []
      };
    default:
      return state;
  }
}

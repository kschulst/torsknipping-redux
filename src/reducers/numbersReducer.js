const initialState = {
    row0: [],
    row1: [],
    row2: [],
    row3: [],
    row4: [],
    row5: [],
    row6: [],
    row7: [],
    row8: [],
    row9: [],
};

export default function numbersReducer(state = initialState, action) {
  switch(action.type){
    case 'SELECT_NUMBER':
      console.log('Reducer is getting: ' + action.index);
     return state[action.index].includes(action.number)
        ? {...state,
        [action.index]: state[action.index].filter((num) => num !== action.number)
      }
        : state[action.index].length <= 6
        ? {...state,
       [action.index]: [...state[action.index], action.number].sort((a, b) => a - b)}
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

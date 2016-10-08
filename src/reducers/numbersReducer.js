export default function numbersReducer(state = [], action) {
  switch(action.type){
    case 'ADD_NUMBER' :
      return [...action.number];
    default:
      return state;
  }
}

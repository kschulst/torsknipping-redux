export function selectNumber(number, index){
  return {
    type: 'SELECT_NUMBER', number, index
  };
}

export function resetNumbers(){
  return {
    type: 'RESET_NUMBERS'
  };
}

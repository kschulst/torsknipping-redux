export function selectNumber(number, array){
  return {
    type: 'SELECT_NUMBER', number, array
  }
}

export function resetNumbers(){
  return {
    type: 'RESET_NUMBERS'
  }
}

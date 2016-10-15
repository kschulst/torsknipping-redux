export function selectNumber(number){
  return {
    type: 'SELECT_NUMBER', number
  }
}
export function resetNumbers(){
  return {
    type: 'RESET_NUMBERS'
  }
}

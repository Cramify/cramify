const state = {
  gameStarted: false,
  questionDisplay: false
}

export const startGame = () => {
  return state.gameStarted = !state.gameStarted,
  state.questionDisplay = !state.questionDisplay
};
const state = {
  gameStarted: false,
  questionDisplay: false
}

const startGame = () => {
  return state.gameStarted = !state.gameStarted,
  state.questionDisplay = !state.questionDisplay
};

describe('can start/end game', () => {
  
  test('before game starts, gameStarted and questionDisplay should be false', () => {
    expect(state.gameStarted && state.questionDisplay).toBeFalsy()
  })
  test('start game clicked, gameStarted true', () => {
    startGame()
    expect(state.gameStarted).toBeTruthy()
  })
  test('start game clicked, question display true', () => {
    expect(state.questionDisplay).toBeTruthy() 
  })
  test('once game is over, gameStarted false', () => {
    startGame()
    expect(state.gameStarted).toBeFalsy()
  })
  test('once game is over, question display should be false', () => {
    expect(state.questionDisplay).toBeFalsy()
  })
})
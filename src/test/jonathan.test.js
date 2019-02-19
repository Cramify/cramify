let state = {
  register: false,
  login: false
}

const registerToggle = () => {
  state.register = !state.register
};

const loginToggle = () => {
  state.login = !state.login
};

describe("Can toggle register on state", () => {
  beforeEach(() => {
    state = {register: false, login: false};
  })
  test("if run once, register should be true", () => {
    registerToggle()
    expect(state.register).toBe(true)
  })
  test('if run twice, register should be false', () => {
    registerToggle()
    registerToggle()
    expect(state.register).toBe(false)
  })
  test('does not affect login on state', () => {
    registerToggle()
    expect(state.login).toBe(false)
  })
  test('does not add an item to state', () => {
    registerToggle()
    expect(Object.keys(state)).toHaveLength(2)
  })
})

describe('Can toggle login on state', () => {
  beforeEach(() => {
    state = {register: false, login: false};
  })
  test("if run once, login should be true", () => {
    loginToggle()
    expect(state.login).toBe(true)
  })
  test('if run twice, login should be false', () => {
    loginToggle()
    loginToggle()
    expect(state.login).toBe(false)
  })
  test('does not affect register on state', () => {
    loginToggle()
    expect(state.register).toBe(false)
  })
  test('does not add an item to state', () => {
    loginToggle()
    expect(Object.keys(state)).toHaveLength(2)
  })
})
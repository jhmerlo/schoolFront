
export function logout (state) {
  state.user = null
}

export function setUser (state, payload) {
  state.user = payload
}

export function setAnswer (state, payload) {
  state.atividades = payload
}

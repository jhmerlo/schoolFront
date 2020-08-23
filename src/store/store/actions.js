export async function loginUser (context, state) {
  context.commit('setUser', state)
}

export function logoutUser (context) {
  context.commit('logout')
}

export function submitAnswer (context, state) {
  context.commit('setAnswer', state)
}

let accessToken: string | null = null

const setToken = (token: string | null) => {
  if (!token) return
  accessToken = token

  localStorage.setItem('token', token)
}

const getToken = () => {
  if (!accessToken) {
    const storagedToken = localStorage.getItem('token')
    accessToken = storagedToken
  }

  return accessToken
}

const deleteToken = () => {
  accessToken = null
  localStorage.removeItem('token')
}

export { setToken, getToken, deleteToken }

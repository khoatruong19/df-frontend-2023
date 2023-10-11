let accessToken: string | null = null

const setToken = (token: string | null) => {
  accessToken = token

  if (!token) {
    localStorage.removeItem('token')
  } else {
    localStorage.setItem('token', token)
  }
}

const getToken = () => accessToken

export { setToken, getToken }

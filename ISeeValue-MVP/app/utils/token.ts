export const setToken = (token: string) => {
  localStorage.setItem('auth_token', token)
}

export const getToken = () => {
  return localStorage.getItem('auth_token')
}

export const removeToken = () => {
  localStorage.removeItem('auth_token')
}

export const isTokenValid = (token: string) => {
  // In a real app, you'd validate the token's expiration and signature
  // For this mock implementation, we'll just check if it exists
  return !!token
}


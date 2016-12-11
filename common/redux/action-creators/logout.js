import cookie from 'react-cookie'

export function logout () {
  cookie.remove('loggedin')
  cookie.remove('user')
  window.location.reload()
}

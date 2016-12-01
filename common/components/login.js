import React from 'react'
import { css, StyleSheet } from 'aphrodite'

const Login = () => (
  <div className={css(styles.login)}>
    <a
      href='/api/users/login'
      className={css(styles.button, styles.facebook)}>
      Login with Facebook
    </a>

    <a
      href='/api/users/login'
      className={css(styles.button, styles.accountKit)}>
      Login with your phone number
    </a>
  </div>
)

const styles = StyleSheet.create({
  login: {
    paddingTop: 20
  },
  button: {
    width: '50%',
    display: 'block',
    marginTop: 30,
    border: 0,
    fontSize: 16,
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none'
  },
  facebook: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#3B5998',
    color: '#fff',
    fontWeight: 700,
    ':active': {
      opacity: 0.9
    }
  },
  accountKit: {
    padding: 20,
    backgroundColor: 'transparent',
    color: '#3B5998',
    fontWeight: 600
  }
})

export default Login

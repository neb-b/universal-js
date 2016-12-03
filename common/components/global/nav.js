import React from 'react'
import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import cookie from 'react-cookie'
import { StyleSheet, css } from 'aphrodite'

const Nav = () => {
  const loggedIn = cookie.load('loggedin')

  let name
  if (loggedIn) {
    name = cookie.load('user')
  }
  return (
    <div>
      <IndexLink to='/'
        className={css(styles.link)}
        activeClassName={css(styles.link, styles.activeLink)}>
        Home
      </IndexLink>
      <Link to='/account'
        className={css(styles.link)}
        activeClassName={css(styles.link, styles.activeLink)}>
        Account
      </Link>
      {
        loggedIn
        ? <span className={css(styles.activeLink, styles.greeting)}>Hello {name}</span>
        : <Link
          to='/login'
          className={css(styles.link)}
          activeClassName={css(styles.link, styles.activeLink)}>
            Login
          </Link>
      }
    </div>
  )
}

const styles = StyleSheet.create({
  link: {
    maxWidth: 700,
    color: '#999',
    margin: '1.5rem 1rem 1.5rem 0',
    display: 'inline-block',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  },
  activeLink: {
    color: '#000'
  },
  greeting: {
    fontWeight: 'bold'
  },
  fakeButton: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    display: 'inline-block',
    fontSize: 16
  },
  fakeLink: {
    marginTop: '-1.5em'
  }
})

export default Nav

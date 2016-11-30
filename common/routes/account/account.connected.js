import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import Account from '../../components/account'

const AccountPage = () => {
  return (
    <div className={css(styles.root)}>
      <Helmet title='Account' />
      <h2 className={css(styles.title)}>Account Info</h2>
      <Account />
      <Link to='account/dashboard'>
        <div className={css(styles.button)}>View Event Dashboard</div>
      </Link>
      <p>show this link only if they are venues</p>
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  button: {
    width: '50%',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#242424',
    color: '#fff'
  }
})

export default AccountPage

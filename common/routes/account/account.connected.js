import React from 'react'
import Helmet from 'react-helmet'
import { StyleSheet, css } from 'aphrodite'
import Account from '../../components/account'

const AccountPage = () => {
  return (
    <div className={css(styles.root)}>
      <Helmet title='Account' />
      <h2 className={css(styles.title)}>Account Info</h2>
      <Account />
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
  }
})

export default AccountPage

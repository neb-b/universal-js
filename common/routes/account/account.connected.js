import React from 'react'
import Helmet from 'react-helmet'
import { StyleSheet, css } from 'aphrodite'
import Account from '../../components/account'

const AccountPage = (props) => {
  console.log('props', props)
  const { location: { query: { registered } } } = props
  return (
    <div className={css(styles.root)}>
      <Helmet title='Account' />
      <h2 className={css(styles.title)}>Account Info</h2>
      <Account newUser={registered === 'true'} />
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

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Account from '../../components/account'
import { createEvent } from '../../redux/action-creators/create-event'

const AccountPage = ({ createEvent }) => {
  return (
    <div className={css(styles.root)}>
      <Helmet title='Account' />
      <h2 className={css(styles.title)}>Account Dashboard</h2>
      <Account />
      <button onClick={() => createEvent('hello world')} className={css(styles.button)}>Create Event</button>
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
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#242424',
    color: '#fff'
  }
})

export default connect(null, { createEvent })(AccountPage)

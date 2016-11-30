import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { createEvent } from '../../redux/action-creators/create-event'
import { loadDashboard } from '../../redux/action-creators/dashboard'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadDashboard())
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})

const Dashboard = ({ createEvent, dashboard }) => {
  return (
    <div className={css(styles.root)}>
      <Helmet title='Account Dashboard' />
      <h2 className={css(styles.title)}>Account Dashboard</h2>
      <p>View/edit created events, add events from facebook</p>
      <button
        onClick={() => createEvent('hello world')}
        className={css(styles.button)}>
        Add an event
      </button>
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
    border: 'none',
    borderRadius: 5,
    backgroundColor: '#242424',
    color: '#fff'
  }
})

export default provideHooks(redial)(connect(mapStateToProps, { createEvent })(Dashboard))

import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { loadDashboard } from '../../redux/action-creators/dashboard'
import Event from '../../components/event'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadDashboard())
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})

const EventPage = (props) => {
  // const { dashboard, location: { query } } = props
  return (
    <div>
      <Helmet title='Event Page' />
      <h2 className={css(styles.title)}>Event Name</h2>
      <Event />
    </div>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  alert: {
    backgroundColor: '#85cb82',
    borderRadius: 5,
    marginBottom: 20
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(EventPage))

import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { createEvent } from '../../redux/action-creators/create-event'
import { loadDashboard } from '../../redux/action-creators/dashboard'
import Dashboard from '../../components/dashboard'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadDashboard())
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})

const DashboardPage = ({ createEvent, dashboard }) => {
  return (
    <div className={css(styles.root)}>
      <Helmet title='Account Dashboard' />
      <Dashboard {...dashboard} createEvent={createEvent} />
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  }
})

export default provideHooks(redial)(connect(mapStateToProps, { createEvent })(DashboardPage))

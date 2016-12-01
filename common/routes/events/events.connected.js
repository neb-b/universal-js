import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { loadEvents } from '../../redux/action-creators/load-events'
import Events from '../../components/events'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadEvents())
}

const mapStateToProps = (state) => ({
  events: state.events
})

const EventsPage = ({ events }) => {
  return (
    <div className={css(styles.root)}>
      <Helmet title='Events' />
      <h2 className={css(styles.title)}>Events</h2>
      <Events {...events} />
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

export default provideHooks(redial)(connect(mapStateToProps)(EventsPage))

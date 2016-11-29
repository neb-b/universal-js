import { provideHooks } from 'redial'
import React from 'react'
import { loadEvents } from '../../redux/action-creators/load-events'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadEvents())
}

const mapStateToProps = (state) => ({
  events: state.events
})

const PostListPage = ({ events }) => {
  console.log('events', events)
  return (
    <div className={css(styles.root)}>
      <Helmet title='Posts' />
      {events.loading &&
        <div>
          <h2 className={css(styles.title)}>Loading....</h2>
        </div>}
      {events.data &&
        <span>events</span>}
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

export default provideHooks(redial)(connect(mapStateToProps)(PostListPage))

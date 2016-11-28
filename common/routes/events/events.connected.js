import { provideHooks } from 'redial'
import React from 'react'
import { loadPosts } from './actions'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { selectPosts } from './reducer'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPosts())
}

const mapStateToProps = state => ({
  events: selectPosts(state)
})

const PostListPage = ({ events }) => (
  <div className={css(styles.root)}>
    <Helmet title='Posts' />
    {events.isLoading &&
      <div>
        <h2 className={css(styles.title)}>Loading....</h2>
      </div>}
    {events.data &&
      <span>{events.data.test}</span>}
  </div>
)

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

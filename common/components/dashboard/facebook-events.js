import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import FacebookPage from './facebook-page'

const FacebookEvents = (props) => {
  const { pages } = props
  return (
    <div className={css(styles.events)}>
      <h2>Your available Facebook Events</h2>
      <p>Click one to create an event</p>
      {
        pages && pages.length
        ? pages && pages.map((page) => <FacebookPage key={page.id} {...page} />)
        : <span>Looks like you don't have any Facebook pages</span>
      }
    </div>
  )
}

const styles = StyleSheet.create({
  events: {

  }
})

export default FacebookEvents

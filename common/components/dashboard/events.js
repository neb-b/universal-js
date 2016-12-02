import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Events = (props) => {
  const { events } = props
  return (
    <div className={css(styles.events)}>
      <h2>User created events</h2>
      {
        events.map((event) => (
          <div key={event.dateAdded}>
            <h3>{event.name}</h3>
            <p>Created at: {event.dateAdded}</p>
          </div>
        ))
      }
    </div>
  )
}
const styles = StyleSheet.create({
  events: {

  }
})

export default Events

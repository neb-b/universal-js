import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import FacebookEvent from './facebook-event'

const events = [
  {
    name: 'Facebook event name 1',
    id: '1283291831295'
  },
  {
    name: 'Facebook event name 2',
    id: '1232932433245'
  },
  {
    name: 'Facebook event name 3',
    id: '8908329084023'
  },
  {
    name: 'Facebook event name 4',
    id: '3490238409234809'
  }
]

// will be passed a list of events in props
const FacebookEvents = () => (
  <div className={css(styles.events)}>
    <h2>Facebook events</h2>
    <p>Click to publish event</p>
    {
      events.map((event) => <FacebookEvent key={event.id} {...event} />)
    }
  </div>
)

const styles = StyleSheet.create({
  events: {

  }
})

export default FacebookEvents

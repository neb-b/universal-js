import React from 'react'
// import { css, StyleSheet } from 'aphrodite'
import FacebookEvent from './facebook-event'

const events = [
  {
    name: 'Facebook event name 1',
    id: 'event_id1'
  },
  {
    name: 'Facebook event name 2',
    id: 'event_id2'
  },
  {
    name: 'Facebook event name 3',
    id: 'event_id3'
  },
  {
    name: 'Facebook event name 4',
    id: 'event_id4'
  }
]

// will be passed a list of events in props
const FacebookEvents = () => (
  <div>
    <h2>Facebook events</h2>
    {
      events.map((event) => <FacebookEvent key={event.id} {...event} />)
    }
  </div>
)

// const styles = StyleSheet.create({
//
// })

export default FacebookEvents

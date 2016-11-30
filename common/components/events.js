import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Events = (props) => {
  const { data, loading } = props
  return (
    <div>
      <p className={css(styles.lead)}>
        This is the events page
      </p>
      {loading &&
        <div>
          <h2 className={css(styles.title)}>Loading....</h2>
        </div>}
      {data &&
        data.map((event) => (
          <div>
            <h3>{event.name}</h3>
            <p>Created at: {event.dateAdded}</p>
          </div>
        ))}
    </div>
  )
}
const styles = StyleSheet.create({
  lead: {
    fontSize: 18,
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  }
})

export default Events

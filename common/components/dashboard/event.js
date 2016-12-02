import React from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'

const Event = (props) => {
  const { name, dateAdded, _id } = props
  return (
    <div key={dateAdded} className={css(styles.event)}>
      <Link to={`/venues/123/events/${_id}`}>
        <h3>{name}</h3>
        <p>Created at: {dateAdded}</p>
      </Link>
    </div>
  )
}

const styles = StyleSheet.create({
  event: {
    textDecoration: 'none',
    border: '1px solid black',
    marginTop: 20
  }
})

export default Event

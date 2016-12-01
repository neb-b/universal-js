import React from 'react'
import { Link } from 'react-router'
import { css, StyleSheet } from 'aphrodite'

const FacebookEvent = (props) => {
  const { name, id } = props
  return (
    <Link to='/account/dashboard/newevent' className={css(styles.noLink)}>
      <div
        className={css(styles.event)}>
        <div className={css(styles.eventText)}>
          <p>{name}</p>
          <p>id: {id}</p>
        </div>
      </div>
    </Link>
  )
}

const styles = StyleSheet.create({
  noLink: {
    textDecoration: 'none'
  },
  event: {
    height: '7em',
    width: '50%',
    marginTop: 20,
    cursor: 'pointer',
    fontWeight: 'bold',
    border: '2px solid #fff',
    borderRadius: 10,
    ':hover': {
      border: '2px solid green'
    }
  },
  eventText: {
    color: '#2c8688'
  }
})

export default FacebookEvent

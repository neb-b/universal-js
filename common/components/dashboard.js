import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import NewEventForm from './dashboard/new-event.connected'

const Dashboard = ({ createEvent }) => (
  <div>
    <h2 className={css(styles.title)}>Account Dashboard</h2>
    <p>View/edit created events, add events from facebook</p>
    <NewEventForm />
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

export default Dashboard

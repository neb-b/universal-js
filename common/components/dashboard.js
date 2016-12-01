import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import NewEventForm from './dashboard/new-event.connected'

const Dashboard = ({ createEvent }) => (
  <div>
    <p>View/edit created events, add events from facebook</p>
    <NewEventForm />
  </div>
)

// const styles = StyleSheet.create({
//
// })

export default Dashboard

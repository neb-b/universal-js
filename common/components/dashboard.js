import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import FacebookEvents from './dashboard/facebook-events'
import CurrentEvents from './dashboard/current-events'

const Dashboard = ({ createEvent }) => (
  <div>
    <p>View/edit created events, add events from facebook</p>
    <FacebookEvents />
    <CurrentEvents />
  </div>
)

// const styles = StyleSheet.create({
//
// })

export default Dashboard

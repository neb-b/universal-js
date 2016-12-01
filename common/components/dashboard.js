import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import FacebookEvents from './dashboard/facebook-events'

const Dashboard = ({ createEvent }) => (
  <div>
    <p>View/edit created events, add events from facebook</p>
    <FacebookEvents />
  </div>
)

// const styles = StyleSheet.create({
//
// })

export default Dashboard

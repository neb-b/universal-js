import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import { Container, Col } from 'react-grid-system'
import FacebookEvents from './dashboard/facebook-events'
import Events from './dashboard/events'

const Dashboard = ({ createEvent, events }) => (
  <div>
    <p>View/edit created events, add events from facebook</p>
    <Container>
      <Col sm={6}><FacebookEvents /></Col>
      <Col sm={6}><Events events={events} /></Col>
    </Container>
  </div>
)

// const styles = StyleSheet.create({
//   dashboard: {
//
//   }
// })

export default Dashboard

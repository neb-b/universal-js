import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import { Container, Col } from 'react-grid-system'
import FacebookEvents from './dashboard/facebook-events'
import Events from './dashboard/events'

const Dashboard = (props) => {
  console.log('props?', props)
  const { loading, error, events } = props
  return (
    <div>
      <p>View/edit created events, add events from facebook</p>
      { error && <div>There has been an error</div> }
      {
        !loading && (
          <Container>
            <Col sm={6}><FacebookEvents pages={events.pages} /></Col>
            <Col sm={6}><Events events={events.userEvents} /></Col>
          </Container>
        )
      }
    </div>
  )
}

// const styles = StyleSheet.create({
//   dashboard: {
//
//   }
// })

export default Dashboard

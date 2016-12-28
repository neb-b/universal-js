import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Container, Row, Col } from 'react-grid-system'
import FacebookEvents from './dashboard/facebook-events'
import Events from './dashboard/events'
import { get } from 'lodash'

const Dashboard = (props) => {
  const { loading, error, dashboard } = props

  // TEMP => should be able to fix this with initialState
  const events = get(dashboard, 'user.club.events', [])

  return (
    <div className={css(styles.dashboard)}>
      <p>View/edit created events, add events from facebook</p>
      { error && <div>There has been an error</div> }
      {
        !loading && dashboard && (
          <Container>
            <Row>
              <Col sm={6}><FacebookEvents pages={dashboard.pages} /></Col>
              <Col sm={6}><Events events={events} /></Col>
            </Row>
          </Container>
        )
      }
    </div>
  )
}

const styles = StyleSheet.create({

})

export default Dashboard

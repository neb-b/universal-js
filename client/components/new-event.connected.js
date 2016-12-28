import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createEvent } from '../redux/action-creators/create-event'
import NewEvent from './new-event/new-event'

const newEventForm = reduxForm({
  form: 'newEvent',
  fields: ['name', 'description'],
  onSubmit: createEvent
})(NewEvent)

const mapStateToProps = (state) => {
  console.log('map state to props')
  const fbData = state.newEvent.fbEvent

  let initialValues
  if (fbData.data) {
    initialValues = {
      name: fbData.data.name,
      description: fbData.data.description
    }
  }

  console.log('initialValues', initialValues)
  return { initialValues }
}

export default connect(mapStateToProps)(newEventForm)

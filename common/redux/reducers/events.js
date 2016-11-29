import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR
} from '../constants'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export default function events (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case GET_EVENTS_SUCCESS:
      return { ...state,
        data: action.payload,
        loading: false}
    case GET_EVENTS_ERROR:
      return { ...state,
        error: action.payload}

    case CREATE_EVENT_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case CREATE_EVENT_SUCCESS:
      return { ...state,
        eventCreate: true,
        loading: false}
    case CREATE_EVENT_ERROR:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

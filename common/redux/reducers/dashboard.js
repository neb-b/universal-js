import {
  LOAD_DASHBOARD_REQUEST,
  LOAD_DASHBOARD_SUCCESS,
  LOAD_DASHBOARD_ERROR
} from '../constants'

const initialState = {
  data: {},
  loading: false,
  error: null
}

export default function dashboard (state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case LOAD_DASHBOARD_SUCCESS:
      return { ...state,
        loading: false}
    case LOAD_DASHBOARD_ERROR:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}
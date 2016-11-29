import { createAction } from './create-action'
import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR, ROOT_URL
} from '../constants'

export function loadEvents () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: GET_EVENTS_REQUEST })
    return axios.get(`${ROOT_URL}/events`)
      .then(res => {
        dispatch(createAction(GET_EVENTS_SUCCESS, res.data))
      })
      .catch(error => {
        dispatch(createAction(GET_EVENTS_ERROR, error))
      })
  }
}

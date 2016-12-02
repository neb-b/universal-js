import { createAction } from './create-action'
import {
  LOAD_FB_EVENT_REQUEST,
  LOAD_FB_EVENT_SUCCESS,
  LOAD_FB_EVENT_ERROR, ROOT_URL
} from '../constants'

export function loadFbEvent (id) {
  console.log('id', id)
  return (dispatch, getState, { axios }) => {
    console.log('test', getState())
    dispatch({ type: LOAD_FB_EVENT_REQUEST })
    return axios.get(`${ROOT_URL}/event/fb/${id}`)
      .then(res => {
        dispatch(createAction(LOAD_FB_EVENT_SUCCESS, res.data))
      })
      .catch(error => {
        dispatch(createAction(LOAD_FB_EVENT_ERROR, error))
      })
  }
}

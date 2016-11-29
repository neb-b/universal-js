import * as types from '../../constants'

const initialState = {
  data: [],
  loading: false,
  error: null
}

export default function events (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_POSTS_REQUEST:
      return { ...state,
        loading: true,
        error: null}
    case types.LOAD_POSTS_SUCCESS:
      return { ...state,
        data: action.payload,
        loading: false}
    case types.LOAD_POSTS_ERROR:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

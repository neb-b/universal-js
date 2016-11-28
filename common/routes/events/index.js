if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'events',
    getComponents (location, cb) {
      require.ensure([
        './events.connected',
        './reducer'
      ], (require) => {
        let EventsPage = require('./events.connected').default
        let events = require('./reducer').default
        injectAsyncReducer(store, 'events', events)
        cb(null, EventsPage)
      })
    }
  }
}
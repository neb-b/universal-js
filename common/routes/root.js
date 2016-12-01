// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../components/app'
import Home from '../components/home'

export default function createRoutes (store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./events').default(store), // no need to modify store, no reducer
          require('./account').default,
          require('./dashboard').default(store),
          require('./login').default,
          require('./not-found').default
        ])
      })
    },

    indexRoute: {
      component: Home
    }
  }

  return root
}

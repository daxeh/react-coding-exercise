import isPromise from 'redux-promise-middleware/dist/isPromise'
import * as actionModule from '../actions'

// Get cached list of defined actions string names
const actions = () => Object.values(actionModule).filter(x => typeof x === 'string')

// The following code snippet provided by 'redux-promise-middleware' as an approach
// to handle global rejected promises. All available actions string names are
// imported as a module to differentiate initial/statuses of events
// @see https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/rejected-promises.md
export default store => next => action => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action)
  }

  if (actions().includes(action.type)) {
    // Dispatch initial pending promise, but catches rejected promises globally
    // and return the error to be consumed
    return next(action).catch(error => error)
  }

  return next(action)
}

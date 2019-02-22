/* global fetch:false */
import get from 'lodash/get'
import { fetchEventsActionCreator, REHYDRATED } from '../actions'
import { eventTypeIdFilterSelector, getEventsApiUrl } from '../selectors'
import qs from 'query-string'

const fetchEvents = async (apiUrl, eventTypeId) => {
  let url = apiUrl
  if (eventTypeId) {
    url += '?' + qs.stringify({ eventTypeId })
  }
  return (
    fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(async response => {
        // Rethrow error via Fetch API response.ok status
        if (!response.ok) {
          const error = new Error(response.statusText)
          error.status = response.status
          throw error
        }
        const json = await response.json()
        if (!json.success) {
          throw new Error('Failed to fetch events')
        }
        return get(json, ['results', 'events'])
      })
      // Return a new promise for middleware to pass through as a promise
      // @see https://stackoverflow.com/questions/42514144/error-handling-redux-promise-middleware
      .then(json => Promise.resolve(json))
      .catch(e => Promise.reject(e))
  )
}

export default store => next => action => {
  const ret = next(action)

  if (action.type === REHYDRATED) {
    const state = store.getState()
    const apiUrl = getEventsApiUrl(state)
    const eventTypeId = eventTypeIdFilterSelector(state)
    store.dispatch(fetchEventsActionCreator(fetchEvents(apiUrl, eventTypeId)))
  }

  return ret
}

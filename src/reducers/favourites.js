import { FETCH_FAVOURITES_TYPE, TOGGLE_FAVOURITE_TYPE } from '../actions'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVOURITES_TYPE:
      return [
        ...state
      ]
    case TOGGLE_FAVOURITE_TYPE:
      const id = action.payload.entityId
      if (state.includes(id)) {
        return state.filter(x => x !== id)
      }
      return [
        ...state,
        id
      ]

    default:
      return state
  }
}

export default reducer

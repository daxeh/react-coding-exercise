import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import LoadingEventsTitle from './LoadingEventsTitle'

jest.mock('./Events', () => function Events () {
  return 'Events'
})

describe('LoadingEventsTitle', () => {
  let store

  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore({
      events: {
        events: [
          {id: 1},
          {id: 2}
        ]
      }
    })
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LoadingEventsTitle ready={'false'} />, div)
  })

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<LoadingEventsTitle debug />)
    expect(component).toMatchSnapshot()
  })

   it('should display correct total events result', () => {
    const component = shallow(<LoadingEventsTitle ready={'true'} found={'4'} />)
    expect(component).toMatchSnapshot()
  })
})

import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Notification from './Notification'

describe('Notification', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Notification />, div)
  })

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Notification debug />)
    expect(component).toMatchSnapshot()
  })
})

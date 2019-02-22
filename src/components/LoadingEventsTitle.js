
import React from 'react'
import injectSheet from 'react-jss'
import { WithLoadingActvity } from './WithLoadActivity'

const EventsTitle = ({ classes, ready, found }) => {
  return (<div className={classes.message}>: {found} events found</div>)
}

const LoadingEventsTitle = WithLoadingActvity(EventsTitle)

export default injectSheet({
  message: {
    transition: 'all 0.3s linear'
  }
})(LoadingEventsTitle)

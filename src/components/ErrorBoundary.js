import React from 'react'
import Notification from './Notification'

const ErrorBoundary = (props) => {
  const { error } = props
  if (error) {
    return <Notification
      code={error.status}
      message={'Uh-oh, this maybe embarrassing and it should not be happening however trust us that we are on it!'}
      clickLabel={'retry'}
      clickHandler={() => window.location.reload()}
    />
  }
  return props.children
}

export default ErrorBoundary

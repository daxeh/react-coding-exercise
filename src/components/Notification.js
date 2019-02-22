import React from 'react'
import injectSheet from 'react-jss'
import theme from '../style/theme'
import classNames from 'classnames'

const Notification = ({ classes, code, message, clickLabel, clickHandler }) => {
  return (
    <div className={classNames(classes.container)}>
      <div className={classes.content}>
        <p>{message} #{code}</p>
        {clickHandler && (<div className={classes.bottom} onClick={clickHandler}>{clickLabel}</div>)}
      </div>
    </div>
  )
}

export default injectSheet({
  container: {
    top: 0,
    left: 0,
    right: 0,
    width: 500,
    padding: 0,
    color: '#fff',
    height: 100,
    margin: [0, 'auto'],
    display: props => props.message ? 'block' : 'none',
    'z-index': 10,
    position: 'fixed',
    'background-color': '#000',
    opacity: '0.8'
  },
  content: {
    padding: 20,
    height: '100%',
    position: 'relative',
    'flex-direction': 'column',
    overflow: 'hidden'
  },
  bottom: {
    height: 22,
    width: 60,
    right: 0,
    color: theme.colors.primary,
    cursor: 'pointer',
    'text-align': 'center',
    position: 'absolute',
    textTransform: 'uppercase'
  },
  hidden: {
    display: 'none'
  }
})(Notification)

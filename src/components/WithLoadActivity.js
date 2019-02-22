import React from 'react'
import injectSheet from 'react-jss'
import theme from '../style/theme'
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({
  barColors: {
    '0': theme.colors.progress,
    '1.0': theme.colors.primary
  }
})

export function WithLoadingActvity (WrappedComponent) {
  return function LoadingComponent ({ ready, error, ...props }) {
    if (!ready && !error) {
      return (<TopBarProgress />)
    }
    return (<WrappedComponent {...props} />)
  }
}

export default injectSheet({
})(WithLoadingActvity)

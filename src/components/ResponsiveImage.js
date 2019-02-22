import React, { Component } from 'react'
import cn from 'classnames'
import injectSheet from 'react-jss'
import defaultImage from '../images/spacer'
import { round } from '../helpers/math'
import get from 'lodash/get'

class ResponsiveImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      didLoad: false
    }
  }

  shouldComponentUpdate (nextProps) {
    // only change if the images change
    const { images, children, className, classes } = this.props
    if (get(images, [0, 'url']) !== get(nextProps.images, [0, 'url'])) {
      return true
    }
    return children !== nextProps.children || className !== nextProps.className || classes !== nextProps.classes
  }

  handleOnLoad = (event) => {
    this.setState({ didLoad: true })
  }

  render () {
    const { images, alt, classes, className, aspect, children } = this.props
    return (
      <div className={cn(classes.container, { [classes.fixedAspect]: aspect }, className)}>
        <picture>
          {images && <source key='jpg' data-srcset={images.map(item => `${item.url} ${item.width}w`)} />}
          <img
            data-sizes='auto'
            alt={alt || ''}
            className={cn('lazyload', classes.image)}
            src={defaultImage}
            onLoad={this.handleOnLoad} />
        </picture>
        {children}
      </div>
    )
  }
}

export default injectSheet({
  container: {
    position: 'relative',
    width: '100%',
    display: 'block',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&::before': {
      display: 'block',
      content: '""'
    }
  },
  fixedAspect: {
    '&::before': {
      paddingTop: ({ aspect }) => `${round(100 / aspect)}%`
    }
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.3s linear',
    objectFit: 'cover',
    fontFamily: '"object-fit: cover;"', // object-fit polyfill
    filter: 'blur(20px) grayscale(60%)', // transition effects
    '&.lazyloaded': {
      filter: 'blur(0) grayscale(0)'
    }
  },
  link: {
    textDecoration: 'none'
  }
})(ResponsiveImage)

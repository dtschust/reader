import React from 'react'

let Filter = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    setActiveFeed: React.PropTypes.func,
    count: React.PropTypes.number
  },

  activateSubscription: function () {
    this.props.setActiveFeed(null)
  },

  render () {
    return (
      <div className='subscription-container' onClick={this.activateSubscription}>
        <div className='subscription-link'>{this.props.title}</div>
        <div className='count'>{this.props.count}</div>
      </div>
    )
  }
})

export default Filter

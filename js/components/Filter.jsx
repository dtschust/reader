import React from 'react'
import FeedItemActions from '../actions/FeedItemActions'

let Filter = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    count: React.PropTypes.number
  },

  activateSubscription: function () {
    FeedItemActions.activeFeedChanged(null)
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

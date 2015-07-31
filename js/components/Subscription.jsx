import React from 'react'
import classnames from 'classnames'
import FeedItemActions from '../actions/FeedItemActions'

let Subscription = React.createClass({
  propTypes: {
    feed: React.PropTypes.object,
    activeFeedId: React.PropTypes.number,
    count: React.PropTypes.number
  },

  activateSubscription: function () {
    FeedItemActions.activeFeedChanged(this.props.feed.feed_id)
  },

  render () {
    return (
      <div
        className={classnames('subscription-container', {'is-active': this.props.feed.feed_id === this.props.activeFeedId})}
        onClick={this.activateSubscription}>
        <div className='subscription-link'>{this.props.feed.title}</div>
        <div className='count'>{this.props.count}</div>
      </div>
    )
  }
})

export default Subscription

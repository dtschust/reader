import React from 'react'
import Subscription from './Subscription'
import Filter from './Filter'

let SubscriptionList = React.createClass({
  propTypes: {
    items: React.PropTypes.object
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.items.feedsTimeStamp !== nextProps.items.feedsTimeStamp ||
           this.props.items.activeFeedId !== nextProps.items.activeFeedId
  },
  render () {
    var activeFeedId = this.props.items.activeFeedId
    return (
      <div className='subscription-list'>
        <div className='filters-container'>
          <Filter title='All'/>
        </div>
        {this.props.items.feeds.map((feed) => {
          var count = this.props.items.counts[feed.feed_id]
          if (!count) {
            return false
          }
          return (
            <Subscription
              key={feed.feed_id}
              feed={feed}
              activeFeedId={activeFeedId}
              count={count}/>
          )
        })}
      </div>
    )
  }
})

export default SubscriptionList

import React from 'react'
import Subscription from './Subscription'
import Filter from './Filter'

let SubscriptionList = React.createClass({
  propTypes: {
    feeds: React.PropTypes.array,
    counts: React.PropTypes.object,
    activeFeedId: React.PropTypes.number,
    setActiveFeed: React.PropTypes.func
  },
  render () {
    // count={this.props.counts[feed.feed_id]}/
    return (
      <div className='subscription-list'>
        <div className='filters-container'>
          <Filter title='Unread' setActiveFeed={this.props.setActiveFeed}/>
          <Filter title='Starred' setActiveFeed={this.props.setActiveFeed}/>
          <Filter title='All' setActiveFeed={this.props.setActiveFeed}/>
        </div>
        {this.props.feeds.map((feed) => {
          return (
            <Subscription
              key={feed.feed_id}
              feed={feed}
              setActiveFeed={this.props.setActiveFeed}
              activeFeedId={this.props.activeFeedId}
              count={130}/>
          )
        })}
      </div>
    )
  }
})

export default SubscriptionList

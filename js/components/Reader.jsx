import React from 'react'

import FeedItemList from './FeedItemList'
import SubscriptionList from './SubscriptionList'
import ItemView from './ItemView'

import AltContainer from 'alt/components/AltContainer'

import FeedItemStore from '../stores/FeedItemStore'
import FeedItemActions from '../actions/FeedItemActions'

require('../../styles/style')

let Reader = React.createClass({
  getInitialState: function () {
    return { activeFeedId: null }
  },

  calculateCounts: function () {
    // var counts = {}
    // feedItems.feed_items.forEach((feed) => {
    //   if (counts[feed.feed_id]) {
    //     counts[feed.feed_id]++
    //   } else {
    //     counts[feed.feed_id] = 1
    //   }
    // })
    // return counts
  },
  componentDidMount: function () {
    FeedItemStore.listen(this.onFeedItemsChanged)
    var state = FeedItemStore.getState()
    if (!state.feed_items.length) {
      console.log('fetching items!!')
      FeedItemActions.fetchFeedItems()
    }
    if (!state.feeds.length) {
      FeedItemActions.fetchSubscriptions()
    }
  },

  componentWillUnmount: function () {
    FeedItemStore.unlisten(this.onFeedItemsChanged)
  },

  onFeedItemsChanged: function () {
    console.log('feed items changed!')
  },

  render () {
    var counts = this.calculateCounts()
    // var activeItem = find(feedItems.feed_items, (item) => {
    //   return this.state.activeItemId && item.feed_item_id === this.state.activeItemId
    // })
    // var feed_items = feedItems.feed_items
    //
    // if (this.state.activeFeedId) {
    //   feed_items = feed_items.filter((item) => {
    //     return item.feed_id === this.state.activeFeedId
    //   })
    // }
    // items={feed_items}
    return (
      <div>
        <AltContainer stores={ {items: FeedItemStore} }>
          <SubscriptionList counts={counts}/>
          <FeedItemList />
          <ItemView/>
        </AltContainer>
      </div>
    )
  }
})

export default Reader

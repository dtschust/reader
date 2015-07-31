import React from 'react'

import FeedItemList from './FeedItemList'
import SubscriptionList from './SubscriptionList'
import ItemView from './ItemView'
import sortBy from 'lodash.sortby'

import AltContainer from 'alt/components/AltContainer'

// var feedItems = require('../../fixtures/feed_items.json')
var subscriptionList = require('../../fixtures/subscription_list.json')

import FeedItemStore from '../stores/FeedItemStore'
import FeedItemActions from '../actions/FeedItemActions'

require('../../styles/style')

let Reader = React.createClass({
  getInitialState: function () {
    return { activeItemId: null, activeFeedId: null }
  },

  setActiveItem: function (feed_item_id) {
    this.setState({ activeItemId: feed_item_id})
  },

  setActiveFeed: function (feed_id) {
    this.setState({ activeFeedId: feed_id})
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
  },

  componentWillUnmount: function () {
    FeedItemStore.unlisten(this.onFeedItemsChanged)
  },

  onFeedItemsChanged: function () {
    console.log('feed items changed!')
  },

  render () {
    subscriptionList.feeds = sortBy(subscriptionList.feeds, 'title')
    var counts = this.calculateCounts()
    var activeItem = null
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
          <SubscriptionList
            feeds={subscriptionList.feeds}
            setActiveFeed={this.setActiveFeed}
            activeFeedId={this.state.activeFeedId}
            counts={counts}/>
          <FeedItemList />
          <ItemView/>
        </AltContainer>
      </div>
    )
  }
})

export default Reader

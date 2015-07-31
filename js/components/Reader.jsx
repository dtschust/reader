import React from 'react'

import FeedItemList from './FeedItemList'
import SubscriptionList from './SubscriptionList'
import ItemView from './ItemView'
import find from 'lodash.find'
import sortBy from 'lodash.sortby'

var feedItems = require('../../fixtures/feed_items.json')
var subscriptionList = require('../../fixtures/subscription_list.json')

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
    var counts = {}
    feedItems.feed_items.forEach((feed) => {
      if (counts[feed.feed_id]) {
        counts[feed.feed_id]++
      } else {
        counts[feed.feed_id] = 1
      }
    })
    return counts
  },

  render () {
    subscriptionList.feeds = sortBy(subscriptionList.feeds, 'title')
    var counts = this.calculateCounts()
    var activeItem = find(feedItems.feed_items, (item) => {
      return this.state.activeItemId && item.feed_item_id === this.state.activeItemId
    })
    var feed_items = feedItems.feed_items

    if (this.state.activeFeedId) {
      feed_items = feed_items.filter((item) => {
        return item.feed_id === this.state.activeFeedId
      })
    }

    return (
      <div>
        <SubscriptionList
          feeds={subscriptionList.feeds}
          setActiveFeed={this.setActiveFeed}
          activeFeedId={this.state.activeFeedId}
          counts={counts}/>
        <FeedItemList
          items={feed_items}
          setActiveItem={this.setActiveItem} />
        <ItemView item={activeItem} />
      </div>
    )
  }
})

export default Reader

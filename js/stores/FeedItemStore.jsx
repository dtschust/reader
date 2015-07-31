var alt = require('../alt')

import FeedItemActions from '../actions/FeedItemActions'
import sortByOrder from 'lodash.sortbyorder'

class FeedItemStore {
  constructor () {
    this.bindListeners({
      handleFeedItemsChanged: FeedItemActions.FEED_ITEMS_CHANGED,
      handleFeedItemsFetchFailed: FeedItemActions.FEED_ITEMS_FETCH_FAILED,
      handleActiveFeedItemChanged: FeedItemActions.ACTIVE_FEED_ITEM_CHANGED,
      handleActiveFeedChanged: FeedItemActions.ACTIVE_FEED_CHANGED,
      handleSubscriptionsChanged: FeedItemActions.SUBSCRIPTIONS_CHANGED,
      handleDepthAdjusted: FeedItemActions.ADJUST_DEPTH
    })

    this.state = {
      feed_items: [],
      feeds: [],
      feedsTimeStamp: 0,
      activeItemId: null,
      activeFeedId: null,
      depth: 0,
      counts: {}
    }
  }

  handleDepthAdjusted (inc) {
    var newValue = this.state.depth + inc
    if (newValue < 0) {
      newValue = 0
    } else if (newValue > 2) {
      newValue = 2
    }
    this.setState({ depth: newValue})
  }

  calculateCounts (feed_items) {
    var counts = {}
    feed_items.forEach((feed) => {
      if (counts[feed.feed_id]) {
        counts[feed.feed_id]++
      } else {
        counts[feed.feed_id] = 1
      }
    })
    return counts
  }

  filterActiveFeedItems () {
    var feed_items = this.state.feed_items
    var activeFeedId = this.state.activeFeedId
    feed_items.forEach((item) => {
      if (!activeFeedId) {
        item.display = true
      } else {
        item.display = item.feed_id === activeFeedId
      }
    })
    this.setState({
      feed_items: feed_items
    })
  }
  handleSubscriptionsChanged (data) {
    if (data.result !== 'success') {
      console.log('invalid data returned, ignoring!')
      return
    }

    var feeds = sortByOrder(data.feeds, 'title')
    this.setState({
      feeds: feeds,
      feedsTimeStamp: new Date().getTime()
    })
  }
  handleFeedItemsChanged (data) {
    if (data.result !== 'success') {
      console.log('invalid data returned, ignoring!')
      return
    }

    // TODO: We're gonna have to dedupe this collection as well!
    var counts
    var currentFeedItems = this.state.feed_items
    currentFeedItems = currentFeedItems.concat(data.feed_items)

    // sort all feed items by publish date
    currentFeedItems = sortByOrder(currentFeedItems, 'published_at', 'desc')

    // Update subscription counts
    counts = this.calculateCounts(currentFeedItems)

    // If we've got 100, we'll need to kick off to get more
    if (data.count === 100 && currentFeedItems.length < 300) {
      FeedItemActions.fetchFeedItems(currentFeedItems.length)
    }
    this.setState({
      feed_items: currentFeedItems,
      counts: counts,
      feedsTimeStamp: new Date().getTime()
    })

    this.filterActiveFeedItems()
  }

  handleActiveFeedItemChanged (feed_item_id) {
    this.setState({ activeItemId: feed_item_id})
  }

  handleActiveFeedChanged (feed_id) {
    this.setState({ activeFeedId: feed_id})
    this.filterActiveFeedItems()
  }

  handleFeedItemsFetchFailed (err) {
    console.log('feed items fetch failed!', err)
  }
}

module.exports = alt.getStore('FeedItemStore') || alt.createStore(FeedItemStore, 'FeedItemStore')

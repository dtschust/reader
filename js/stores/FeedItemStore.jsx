var alt = require('../alt')

import FeedItemActions from '../actions/FeedItemActions'
import sortByOrder from 'lodash.sortbyorder'

class FeedItemStore {
  constructor () {
    this.bindListeners({
      handleFeedItemsChanged: FeedItemActions.FEED_ITEMS_CHANGED,
      handleFeedItemsFetchFailed: FeedItemActions.FEED_ITEMS_FETCH_FAILED,
      handleActiveFeedItemChanged: FeedItemActions.ACTIVE_FEED_ITEM_CHANGED
    })

    this.state = {
      feed_items: [],
      activeItemId: null
    }
  }
  handleFeedItemsChanged (data) {
    if (data.result !== 'success') {
      console.log('invalid data returned, ignoring!')
      return
    }

    // TODO: We're gonna have to dedupe this collection as well!
    var currentFeedItems = this.state.feed_items
    currentFeedItems = currentFeedItems.concat(data.feed_items)

    // sort all feed items by publish date
    currentFeedItems = sortByOrder(currentFeedItems, 'published_at', 'desc')

    // Update subscription counts

    // If we've got 100, we'll need to kick off to get more
    if (data.count === 100 && currentFeedItems.length < 1000) {
      FeedItemActions.fetchFeedItems(currentFeedItems.length)
    }
    this.setState({
      feed_items: currentFeedItems
    })

    console.log('Pulled in feed items!', currentFeedItems)
  }

  handleActiveFeedItemChanged (feed_item_id) {
    console.log('updating active feed item id in the store!')
    this.setState({ activeItemId: feed_item_id})
  }

  handleFeedItemsFetchFailed (err) {
    console.log('feed items fetch failed!', err)
  }
}

module.exports = alt.getStore('FeedItemStore') || alt.createStore(FeedItemStore, 'FeedItemStore')

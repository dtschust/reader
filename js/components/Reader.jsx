import React from 'react'

import FeedItemList from './FeedItemList'
import SubscriptionList from './SubscriptionList'
import ItemView from './ItemView'
import MainPanel from './MainPanel'

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
  },

  render () {
    var counts = this.calculateCounts()

    return (
      <div>
        <AltContainer stores={ {items: FeedItemStore} }>
          <SubscriptionList counts={counts}/>
          <MainPanel>
            <AltContainer stores={ {items: FeedItemStore} }>
              <FeedItemList />
              <ItemView/>
            </AltContainer>
          </MainPanel>
        </AltContainer>
      </div>
    )
  }
})

export default Reader

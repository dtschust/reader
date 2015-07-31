import React from 'react'

import FeedItemList from './FeedItemList'
import SubscriptionList from './SubscriptionList'
import ItemViewContainer from './ItemViewContainer'
import MainPanel from './MainPanel'

import AltContainer from 'alt/components/AltContainer'

import FeedItemStore from '../stores/FeedItemStore'
import FeedItemActions from '../actions/FeedItemActions'

require('../../styles/style')

let Reader = React.createClass({
  getInitialState: function () {
    return { activeFeedId: null }
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
    return (
      <div>
        <AltContainer stores={ {items: FeedItemStore} }>
          <SubscriptionList/>
          <MainPanel>
            <AltContainer stores={ {items: FeedItemStore} }>
              <FeedItemList />
              <ItemViewContainer/>
            </AltContainer>
          </MainPanel>
        </AltContainer>
      </div>
    )
  }
})

export default Reader

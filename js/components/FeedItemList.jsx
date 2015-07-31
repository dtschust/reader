import React from 'react'

import FeedItem from './FeedItem'

let FeedItemList = React.createClass({
  propTypes: {
    items: React.PropTypes.object
  },

  render () {
    return (
      <div className='feed-item-list-container'>
        <div className='feed-item-list'>
        {this.props.items.feed_items.map((item) => {
          if (!item.display) {
            return false
          }
          return (
            <FeedItem
              key={item.feed_item_id}
              item={item}
              active={this.props.items.activeItemId === item.feed_item_id} />
          )
        })}
        </div>
      </div>
    )
  }
})

export default FeedItemList

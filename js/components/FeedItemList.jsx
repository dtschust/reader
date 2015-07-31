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
          return (
            <FeedItem key={item.feed_item_id} item={item} />
          )
        })}
        </div>
      </div>
    )
  }
})

export default FeedItemList

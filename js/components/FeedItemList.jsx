import React from 'react'

import FeedItem from './FeedItem'

let FeedItemList = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    setActiveItem: React.PropTypes.func
  },

  render () {
    return (
      <div className='feed-item-list-container'>
        <div className='feed-item-list'>
        {this.props.items.map((item) => {
          return (
            <FeedItem key={item.feed_item_id} item={item} setActiveItem={this.props.setActiveItem} />
          )
        })}
        </div>
      </div>
    )
  }
})

export default FeedItemList

import React from 'react'
import moment from 'moment'

let ItemView = React.createClass({
  propTypes: {
    item: React.PropTypes.object
  },

  render () {
    var item = this.props.item
    var content
    var meta
    if (!item) {
      content = (
        <div className='item-body'> NO DATA STATE </div>
      )
    } else {
      content = (
        <div className='item-body' dangerouslySetInnerHTML={{__html: item.body}}/>
      )
      meta = (
        <div className='item-view-meta'>
          <div className='feed-time'>{moment(item.published_at * 1000).calendar()}</div>
          <div className='feed-title'>{item.title}</div>
          <div className='feed-author'>{item.author}</div>
          <div className='feed-name'>{item.feed_name}</div>
        </div>
      )
    }
    return (
      <div className='item-view-container'>
        {meta}
        <div className='item-view'>
        {content}
        </div>
      </div>
    )
  }
})

export default ItemView

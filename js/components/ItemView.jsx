import React from 'react'
import moment from 'moment'
import find from 'lodash.find'
import sanitizeHtml from 'sanitize-html'

let ItemView = React.createClass({
  propTypes: {
    items: React.PropTypes.object
  },

  render () {
    var activeItemId = this.props.items.activeItemId
    var item = find(this.props.items.feed_items, (item) => {
      return activeItemId && item.feed_item_id === activeItemId
    })
    var sanitizedBody
    var content
    var meta
    if (!item) {
      content = (
        <div className='item-body'> NO DATA STATE </div>
      )
    } else {
      sanitizedBody = sanitizeHtml(item.body, {allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])})
      content = (
        <div className='item-body' dangerouslySetInnerHTML={{__html: sanitizedBody}}/>
      )
      meta = (
        <a className='item-view-meta' target='_blank' href={item.url}>
          <div className='feed-time'>{moment(item.published_at * 1000).calendar()}</div>
          <div className='feed-title'>{item.title}</div>
          <div className='feed-author'>{item.author}</div>
          <div className='feed-name'>{item.feed_name}</div>
        </a>
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

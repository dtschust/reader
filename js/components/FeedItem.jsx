import React from 'react'
import moment from 'moment'
import sanitizeHtml from 'sanitize-html'
import FeedItemActions from '../actions/FeedItemActions'
import classnames from 'classnames'

let FeedItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object,
    active: React.PropTypes.bool
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.active !== nextProps.active ||
           this.props.item.feed_item_id !== nextProps.item.feed_item_id
  },

  getInitialState: function () {
    var sanitizedBody = sanitizeHtml(this.props.item.body)
    var summary = document.createElement('div')
    summary.innerHTML = sanitizedBody
    summary = summary.innerText
    return {
      summary: summary
    }
  },

  handleClick: function () {
    FeedItemActions.activeFeedItemChanged(this.props.item.feed_item_id)
  },

  render () {
    // <div ref='feedBody' className='feed-body' dangerouslySetInnerHTML={{__html: this.state.sanitizedBody}} />
    var item = this.props.item
    return (
      <a href='javascript:void(0);' className={classnames('feed-item-container', {'is-active': this.props.active})} onClick={this.handleClick}>
        <span className='feed-time'>about {moment(item.published_at * 1000).fromNow()}</span>
        <div className='feed-name'>{item.feed_name}</div>
        <span className='feed-title'>{item.title}</span>
        <div className='feed-body-summary'>{this.state.summary}</div>
      </a>
    )
  }
})

export default FeedItem

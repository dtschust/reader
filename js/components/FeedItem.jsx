import React from 'react'
import moment from 'moment'
import sanitizeHtml from 'sanitize-html'
import FeedItemActions from '../actions/FeedItemActions'

let FeedItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object
  },

  getInitialState: function () {
    return { summary: false }
  },
  componentDidMount: function () {
    var summary = this.refs.feedBody.getDOMNode().innerText
    if (summary.length === 0) {
      summary = '-'
    }
    this.setState({ summary: summary })
  },

  handleClick: function () {
    FeedItemActions.activeFeedItemChanged(this.props.item.feed_item_id)
  },

  render () {
    var item = this.props.item
    var summaryContainer = false
    var sanitizedBody = sanitizeHtml(item.body)
    if (this.state.summary) {
      summaryContainer = (
        <div className='feed-body-summary'>{this.state.summary}</div>
      )
    }
    return (
      <div className='feed-item-container' onClick={this.handleClick}>
        <span className='feed-time'>about {moment(item.published_at * 1000).fromNow()}</span>
        <div className='feed-name'>{item.feed_name}</div>
        <span className='feed-title'>{item.title}</span>
        <div ref='feedBody' className='feed-body' dangerouslySetInnerHTML={{__html: sanitizedBody}} />
        {summaryContainer}
      </div>
    )
  }
})

export default FeedItem

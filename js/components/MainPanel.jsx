import React from 'react'
import classnames from 'classnames'
import FeedItemActions from '../actions/FeedItemActions'

let MainPanel = React.createClass({
  propTypes: {
    items: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
      ])
  },
  incrementDepth: function () {
    FeedItemActions.adjustDepth(1)
  },

  decrementDepth: function (ev) {
    // HACKS!
    var inc = 1
    var isDesktop = window.getComputedStyle(ev.currentTarget).getPropertyValue('content').indexOf('large') >= 0
    if (isDesktop) {
      inc++
    }
    ev.stopPropagation()
    FeedItemActions.adjustDepth(-inc)
  },

  getInitialState: function () {
    return {active: false}
  },
  depthClassMap: [
    '',
    'is-active',
    'is-extra-active'
  ],

  render () {
    var depth = this.props.items.depth
    return (
      <div onClick={this.incrementDepth} className={classnames('main-panel', this.depthClassMap[depth])}>
        <div onClick={this.decrementDepth} className='close-panel'>
          <div className='back' dangerouslySetInnerHTML={{__html: '<'}} />
        </div>
          {this.props.children}
      </div>
    )
  }
})

export default MainPanel

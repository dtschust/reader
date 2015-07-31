import React from 'react/addons'
import ItemView from './ItemView'
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

let ItemViewContainer = React.createClass({
  propTypes: {
    items: React.PropTypes.object
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.items.activeItemId !== nextProps.items.activeItemId
  },

  render () {
    return (
      <ReactCSSTransitionGroup transitionName='item-view'>
        <ItemView key={this.props.items.activeItemId} items={this.props.items}/>
      </ReactCSSTransitionGroup>
    )
  }
})

export default ItemViewContainer

import React from 'react'
import classnames from 'classnames'

let MainPanel = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
      ])
  },
  activePanel: function () {
    this.setState({ active: true })
  },

  deactivatePanel: function (ev) {
    ev.stopPropagation()
    this.setState({ active: false })
  },

  getInitialState: function () {
    return {active: false}
  },

  render () {
    return (
      <div onClick={this.activePanel} className={classnames('main-panel', { 'is-active': this.state.active})}>
        <div onClick={this.deactivatePanel} className='close-panel'>
          <div className='back' dangerouslySetInnerHTML={{__html: '<'}} />
        </div>
          {this.props.children}
      </div>
    )
  }
})

export default MainPanel

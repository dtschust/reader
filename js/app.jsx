import React from 'react'
import Router from 'react-router'
import { Link, Route, RouteHandler } from 'react-router'

import ReaderHandler from './components/Reader'

let App = React.createClass({

  render () {
    return (
      <div className='main-container'>
        <div style={{display: 'none'}} className='nav'>
          <Link to='app'>Home</Link>
          <Link to='reader'>Reader</Link>
          hello
        </div>
        <RouteHandler/>
      </div>
    )
  }
})

let routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='reader' path='/reader' handler={ReaderHandler}/>
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body)
})

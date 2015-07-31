var alt = require('../alt')
var nets = require('nets')
var accessToken = require('../accessToken')

class FeedItemActions {
  constructor () {
    this.generateActions('feedItemsChanged', 'feedItemsFetchFailed', 'activeFeedItemChanged')
  }
  fetchFeedItems (offset) {
    var url = 'http://localhost:8000/api/v2/feed_items/list?read=false&access_token=' + accessToken
    if (offset) {
      url += '&offset=' + offset
    }
    nets({url: url, encoding: undefined},
      (err, res, body) => {
        if (err) {
          console.log('ERROR: ', err)
          return
        }
        var parsedBody
        try {
          parsedBody = JSON.parse(body)
        } catch (e) {
          var errorMessage = 'Error parsing JSON from '
          console.log(errorMessage)
          return
        }
        this.actions.feedItemsChanged(parsedBody)
      })
  }
}

module.exports = alt.createActions(FeedItemActions)

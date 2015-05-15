
var defaults = {

  // Port used by the express server
  expressPort: 8080,

  // Port used by webpack-dev-server
  webpackDevServerPort: 2992,

  // Virtual directory used by webpack-dev-server that will serve the
  // client version of the app
  webpackVirtualDir: 'tmp',

  // You may want to change this to your local IP address
  // to access the page over your local network.
  host: 'localhost',

  // Filename of the clients app
  appName: 'app',

  // Get the path to the clients app file
  getDevClientAppPath: function getDevClientAppPath() {
    return 'http://' + defaults.host + ':' + defaults.webpackDevServerPort
         + '/' + defaults.webpackVirtualDir + '/' + defaults.appName + '.js'
  },

  getClientAppPath: function getClientAppPath() {
    return '/' + defaults.appName + '.js'
  }

}

module.exports = defaults

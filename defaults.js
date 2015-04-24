
module.exports = {

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
  getClientAppPath: function() {
    return 'http://' + this.host + ':' + this.webpackDevServerPort +
           '/' + this.webpackVirtualDir + '/' + this.appName + '.js'
  }

};

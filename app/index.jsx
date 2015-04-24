
import React from 'react';

class IndexPage extends React.Component {

  static getDoctype() {
    return '<!doctype html>'
  }

  static renderToStaticMarkup(props) {
    return IndexPage.getDoctype()
      + React.renderToStaticMarkup(<IndexPage {...props} />)
  }

  render() {
    return (
      <html className='no-js' lang='en_US'>
        <head>
          <meta charSet='utf-8'/>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>

          <title>Isomorphic React Webpack Boilerplate</title>

          <meta name='description' content=''/>
          <meta name='keywords' content=''/>

          {/* Spiders must use meta description */}
          <meta name='robots' content='noodp, noydir'/>

          {/* No Google Translate toolbar */}
          <meta name='google' content='notranslate'/>

          {/* Viewport and mobile */}
          <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1'/>
          <meta name='HandheldFriendly' content='true'/>
          <meta name='MobileOptimized' content='320'/>

          {/*<link rel='stylesheet' href={this.props.mainCSS}/>*/}

        </head>
        <body>
          <div id='app'>
            <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
          </div>

          <script src={this.props.app}></script>
        </body>
      </html>
    );
  }

}

module.exports = IndexPage;


import React, { Component, PropTypes as PT } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export default class IndexPage extends Component {

  static propTypes = {
    app: PT.string.isRequired,
    content: PT.string.isRequired,
    vendor: PT.string.isRequired
  }

  constructor(props, context) {
    super(props, context)
  }

  static getDoctype() {
    return '<!doctype html>'
  }

  static renderToStaticMarkup(props) {
    return IndexPage.getDoctype()
      + renderToStaticMarkup(<IndexPage {...props}/>)
  }

  render() {
    const { vendor, content, app } = this.props

    return (
      <html
        className='no-js'
        lang='en_US'
        >
        <head>
          <meta charSet='utf-8'/>
          <meta content='IE=edge,chrome=1' httpEquiv='X-UA-Compatible'/>

          <title>Isomorphic React Webpack Boilerplate</title>

          <meta content='' name='description'/>
          <meta content='' name='keywords'/>

          {/* Spiders must use meta description */}
          <meta content='noodp, noydir' name='robots'/>

          {/* No Google Translate toolbar */}
          <meta content='notranslate' name='google'/>

          {/* Viewport and mobile */}
          <meta content='width = device-width,
                         initial-scale = 1,
                         user-scalable = no,
                         maximum-scale = 1,
                         minimum-scale = 1'
            name='viewport'
            />
          <meta content='true' name='HandheldFriendly'/>
          <meta content='320' name='MobileOptimized'/>

          {/* <link rel='stylesheet' href={this.props.mainCSS}/> */}

        </head>
        <body>
          <div id='app'>
            <div dangerouslySetInnerHTML={{ __html: content }}/>
          </div>

          <script src={vendor}></script>
          <script src={app}></script>
        </body>
      </html>
    )
  }

}


import React, { Component, PropTypes as PT } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import fs from 'fs'
import paths from '../../paths'
import { DEBUG, appName, vendorName, statsName, inlineName } from '../../config'

const encoding = { encoding: 'utf8' }

export default class Index extends Component {

  static propTypes = {
    app: PT.string.isRequired,
    content: PT.string.isRequired,
    inline: DEBUG ? PT.bool : PT.string,
    vendor: PT.string.isRequired
  }

  static defaultProps = {
    app: Index.getScript(appName),
    vendor: Index.getScript(vendorName),
    inline: Index.getWebpackJsonpInlineScript()
  }

  constructor(props, context) {
    super(props, context)
  }

  static getDoctype() {
    return '<!doctype html>'
  }

  static getScript(name) {
    if (DEBUG) return `${paths.devPublicDir()}/${name}.js`

    const file = fs.readFileSync(`${paths.publicDir()}/${statsName}.json`, encoding)
    const stats = JSON.parse(file)

    return stats.assetsByChunkName[name]
  }

  static getWebpackJsonpInlineScript() {
    if (DEBUG) return false
    return fs.readFileSync(`${paths.publicDir()}/${inlineName}.js`, encoding)
  }

  static renderToStaticMarkup(props) {
    return Index.getDoctype() + renderToStaticMarkup(<Index {...props}/>)
  }

  render() {
    const { app, content, inline, vendor } = this.props

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

        </head>
        <body>
          <div id='app'>
            <div dangerouslySetInnerHTML={{ __html: content }}/>
          </div>

          {inline && <script dangerouslySetInnerHTML={{ __html: inline }}/>}
          <script src={vendor}/>
          <script src={app}/>
        </body>
      </html>
    )
  }
}

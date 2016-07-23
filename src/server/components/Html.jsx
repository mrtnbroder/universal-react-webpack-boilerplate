
import React, { Component, PropTypes } from 'react';
import fs from 'fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { publicDir } from '../../../config/paths';
import { DEBUG, appName, vendorName, statsName, inlineName } from '../../../config/config';
import { GoogleAnalytics, Segment, Stripe, Page, TypeformIntegration } from './vendor';
import './html.css';

const encoding = { encoding: 'utf8' }

export default class Html extends Component {

  static propTypes = {
    app: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    initalState: PropTypes.object.isRequired,
    inline: DEBUG ? PropTypes.bool.isRequired : PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
    googleAnalyticsKey: PropTypes.string.isRequired,
    segmentKey: PropTypes.string.isRequired,
    stripeKey: PropTypes.string.isRequired
  }

  static defaultProps = {
    app: Html.getScript(appName),
    vendor: Html.getScript(vendorName),
    inline: Html.getWebpackJsonpInlineScript()
  }

  static getDoctype() {
    return '<!doctype html>'
  }

  static getScript(name) {
    if (DEBUG) return `/${name}.js`

    const file = fs.readFileSync(`${publicDir}/${statsName}.json`, encoding)
    const stats = JSON.parse(file)

    return `/${stats.assetsByChunkName[name]}`
  }

  static getWebpackJsonpInlineScript() {
    if (DEBUG) return false
    return fs.readFileSync(`${publicDir}/${inlineName}.js`, encoding)
  }

  static renderToStaticMarkup(props) {
    return Html.getDoctype() + renderToStaticMarkup(<Html {...props}/>)
  }

  render() {
    const { app, content, inline, vendor, initalState, googleAnalyticsKey, segmentKey, stripeKey } = this.props

    return (
      <html className='no-js' lang='en_US'>
      <head>
        <meta charSet='utf-8'/>
        <meta content='IE=edge,chrome=1' httpEquiv='X-UA-Compatible'/>

        <title>Universal React Webpack Boilerplate</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,600|Roboto+Mono:400|Karla:400,700' rel='stylesheet' />

          <meta content='' name='description'/>
          <meta content='' name='keywords'/>

          {/* Spiders must use meta description */}
          <meta content='noodp, noydir' name='robots'/>

          {/* No Google Translate toolbar */}
          <meta content='notranslate' name='google'/>

          {/* Viewport and mobile */}
          <meta content='width = device-width, initial-scale = 1,
                         user-scalable = no, maximum-scale = 1,
                         minimum-scale = 1' name='viewport'/>
          <meta content='true' name='HandheldFriendly'/>
          <meta content='320' name='MobileOptimized'/>

          <link href='./style.css' rel='stylesheet'/>
      </head>
      <body>
      <div id='app'>
        <div dangerouslySetInnerHTML={{ __html: content }}/>
      </div>

      {inline && <script dangerouslySetInnerHTML={{ __html: inline }}/>}
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(initalState)}` }}/>
      <script src={ vendor } />
      <script src={ app } />
      <script src={ googleAnalyticsKey ? <GoogleAnalytics account={googleAnalyticsKey} history={history} /> : null } />
      <script src={ segmentKey ? <Segment writeKey={segmentKey} history={history} /> : null } />
      <script src={ stripeKey ? <Stripe stripeKey={stripeKey}/> : null } />

      </body>
      </html>
    )
  }
}

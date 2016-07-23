import React from 'react';

export class GoogleAnalytics extends React.Component {

  static propTypes = {
    account: React.PropTypes.string.isRequired,
    history: React.PropTypes.object,
  };

  componentDidMount() {
    window.ga = window.ga || (() => {
        (ga.q = ga.q || []).push(arguments);
      });
    ga.l = +new Date;
    const account = this.props.account;
    // const scriptProtocol = ("https:" === document.location.protocol ? "https://ssl" : "http://www");
    const scriptSrc = `//google-analytics.com/analytics.js`;
    jQuery.getScript(scriptSrc, () => {
      // Track Route changes
      ga("create", account, "auto");
      if (this.props.history) {
        this.props.history.listen((newLocation) => {
          ga("send", "pageview", newLocation.pathname);
        });
      }
    });
  }

  render() {
    return
  <
    div
    key = "google-analytics" / >;
  }
}


/*
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-xxxxxxx-0", "auto");
ga("send", "pageview");
*/

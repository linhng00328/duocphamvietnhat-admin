import React, { Component } from "react";
import routes from "./routes";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import { randomString } from "./ultis/helpers";
import themeData from "./ultis/theme_data";
import getChannel from "./ultis/channel"

class App extends Component {


  componentDidMount() {
    document.title = `Quản lý - ${themeData().loginTitle}`
    document.getElementById("root").className = getChannel();
    document.head.innerHTML = document.head.innerHTML + `<link rel="icon"  href="${themeData().favicon}"/>`

 




  }

  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            // key = {index}
            key={randomString(10)}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }

    return <Switch>{result}</Switch>;
  };
  render() {
    return <Router history={history}>{this.showContentMenus(routes)}</Router>
  }
}

export default App;

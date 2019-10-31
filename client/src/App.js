import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Main} />
        </div>
      </Router>
    );
  }
}

export default App;
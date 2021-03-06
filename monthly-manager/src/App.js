import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Overview from './components/Overview'
import Startup from './pages/Startup'
import NewExpense from './pages/NewExpense'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Startup} />
            <Route path='/login' component={Login} />
            <Route path='/overview' component={Overview} />
            // <Route path='/newexpense' component={NewExpense} />
          </Switch>
        </Router>
      </div>
    )
  }
}


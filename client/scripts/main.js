import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import MessageContainer from './components/messageComponent'
import ChoreContainer from './components/choreComponent'
import FinanceContainer from './components/financeComponent'


var App = React.createClass({
  getInitialState: function() {
    return {
      view: 'Message'
    }
  },
  renderView: function(view) {
    this.setState({view: view});
  },
  render: function() {
    return (
      <div className="app-container">
        <div className="col-xs-5 col-md-4 col-lg-4 interface-container side-bar-container">
          <ImageContainer />
          <h3>Samuel</h3>
          <NavigationContainer changeView={this.renderView} />
          <Logout />
        </div>
        <div className="col-xs-7 col-md-8 col-lg-8 interface-container">
          <ContentContainer view={this.state.view} />
        </div>
      </div>
    )
  }
});

var ImageContainer = React.createClass({
  render: function() {
    return <img height="150" src="https://s-media-cache-ak0.pinimg.com/736x/fb/e1/cd/fbe1cdbc1b728fbb5e157375905d576f.jpg" />
  }
});

var NavigationContainer = React.createClass({
  render: function() {
    return (<div className="navigation-link">
        <h3 onClick={this.renderMessage}>Messages</h3>
        <h3 onClick={this.renderFinance}>Finance</h3>
        <h3 onClick={this.renderChore}>Chores</h3>
      </div>
    )
  },
  renderMessage() {
    this.props.changeView('Message');
  },
  renderFinance() {
    this.props.changeView('Finance');
  },
  renderChore() {
    this.props.changeView('Chore');
  }
});

var Logout = React.createClass({
  mixins : [Router.Navigation],
  logout: function() {
    window.localStorage.removeItem('userId');
    window.location.href = "http://localhost:3000/";
  },
  render: function() {
    return <button onClick={this.logout} className="btn btn-danger">Logout</button>
  }
});

var ContentContainer = React.createClass({
  render: function() {
    if (this.props.view === 'Message') {
      return <MessageContainer />
    } else if (this.props.view === 'Chore') {
      return <ChoreContainer />
    } else if (this.props.view === 'Finance') {
      return <FinanceContainer />
    }
  }
});

var Login = React.createClass({
  login: function() {
    window.localStorage.setItem('userId', this.refs.userId.value);
  },
  render: function() {
    return (
      <form onSubmit={this.login} className="form-group">
        <label htmlFor="userId-input">userId</label>
        <input ref="userId" id="userId-input" className="form-control" type="text" />
        <button className="btn btn-success">Login</button>
      </form>
    )
  }
});

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={Login}/>
    <Route path="/house" component={App}/>
  </Router>
)

if (window.localStorage.getItem('userId')) {
  ReactDOM.render(<App />, document.querySelector('#app'));
} else {
  ReactDOM.render(routes, document.querySelector('#app'));
}


// ReactDOM.render(<App />, document.querySelector('#app'));
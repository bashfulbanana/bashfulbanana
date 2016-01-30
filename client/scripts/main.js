import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, History } from 'react-router';
import { createHistory } from 'history';
import MessageContainer from './components/messageComponent'
import ChoreContainer from './components/choreComponent'
import FinanceContainer from './components/financeComponent'
import RegistrationContainer from './components/registrationComponent'
import NavBar from './components/navbarComponent'

var navbar = {};
navbar.links = [
  {render: "Message", text: "Messages"},
  {render: "Finance", text: "Finances"},
  {render: "Chore", text: "Chores"}
];

var App = React.createClass({
  getInitialState: function() {
    this.getSession()
    return {
      view: 'Messages'
    }
  },
  getSession: function() {
    $.ajax({
      url: 'http://localhost:8080/obie/',
      type: 'GET',
      contentType: 'application/json',
      success: function(session) {
        console.log('got session: ', session);
        localStorage.setItem('obie', session);
      }.bind(this),
      error: function() {
        console.log('error getting session');
      }
    });
  },
  renderView: function(view) {
    console.log("view: ", view);
    this.setState({view: view});
  },
  render: function() {
    return (
      <div>
        <NavBar {...navbar} changeView={this.renderView} />
        <div className="app-container col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div className="col-xs-5 col-md-4 col-lg-4 side-bar-container">
            <div className="side-bar-filler">
              <ImageContainer />
              <h3>Samuel</h3>
              <NavigationContainer changeView={this.renderView} />
              <Logout />
            </div>
          </div>
          <div className="col-xs-7 col-md-8 col-lg-8 interface-container main-bar-container">
            <ContentContainer view={this.state.view} />
          </div>
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
    return (
      <div className="navigation-link">
        <h3 onClick={this.renderMessage}>Messages</h3>
        <h3 onClick={this.renderFinance}>Finance</h3>
        <h3 onClick={this.renderChore}>Chores</h3>
      </div>
    )
  },
  renderMessage() {
    this.props.changeView('Messages');
  },
  renderFinance() {
    this.props.changeView('Finances');
  },
  renderChore() {
    this.props.changeView('Chores');
  }
});

var Logout = React.createClass({
  mixins: [Router.Navigation],
  logout: function() {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('houseId');
    window.location.href = "http://localhost:8080/";
  },
  render: function() {
    return <button onClick={this.logout} className="btn btn-danger">Logout</button>
  }
});

var ContentContainer = React.createClass({
  render: function() {
    if (this.props.view === 'Messages') {
      return <MessageContainer />
    } else if (this.props.view === 'Chores') {
      return <ChoreContainer />
    } else if (this.props.view === 'Finances') {
      return <FinanceContainer />
    }
  }
});

var Login = React.createClass({
  mixins: [History], 

  login: function(event) {
    event.preventDefault();
    window.localStorage.setItem('userId', this.refs.userId.value);
    window.localStorage.setItem('houseId', this.refs.houseId.value);
    this.history.pushState(null, '/registration');
  },

  render: function() {
    return (
      <form onSubmit={this.login} className="form-group">
        <label htmlFor="userId-input">userId</label>
        <input ref="userId" id="userId-input" className="form-control" type="text" />
        <label htmlFor="userId-input">houseId</label>
        <input ref="houseId" id="userId-input" className="form-control" type="text" />
        <button className="btn btn-success">Login</button>

        <a href="/auth/venmo">Log In with Venmo</a>
      </form>
    )
  }
});

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={Login}/>
    <Route path="/house" component={App}/>
    <Route path="/registration" component={RegistrationContainer}/>
  </Router>
)

$(".side-bar-filler").css({'height':($(".side-bar-container").height()+'px')});

// ReactDOM.render(routes, document.querySelector('#main'));

// if (window.localStorage.getItem('userId')) {
//   ReactDOM.render(<App />, document.querySelector('#app'));
// } else {
//   ReactDOM.render(routes, document.querySelector('#app'));
// }

ReactDOM.render(routes, document.querySelector('#app'))


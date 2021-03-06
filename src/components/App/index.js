import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import HomePage from '../HomePage';
import SchoolPage from '../SchoolPage';
import NavRouterLink from '../../helpers';
import './App.css';

const Test = () => <h1>Test</h1>;

const Navigation = () => {
  return (
    <Navbar fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">eduview3</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavRouterLink to="/">Map</NavRouterLink>
          <NavRouterLink to="/test">Search</NavRouterLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Navigation />

            <Route exact path="/" component={HomePage} />
            <Route path="/school/:id" component={SchoolPage} />
            <Route path="/error" component={Test} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;

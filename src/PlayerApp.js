import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer';
import MainNavigation from './components/MainNavigation';
import PlayerHomePage from './components/PlayerHomePage';
import LibraryPage from './components/LibraryPage';
import HistoryPage from './components/HistoryPage';
import ProjectsPage from './components/ProjectsPage';
import AccountPage from './components/AccountPage';
import './PlayerApp.css';

class PlayerApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <MainNavigation />
          <Switch>
            <Route exact path="/" component={PlayerHomePage} />
            <Route path="/library" component={LibraryPage} />
            <Route path="/history" component={HistoryPage} />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/account" component={AccountPage} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default PlayerApp;
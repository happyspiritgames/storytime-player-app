import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer';
import MainNavigation from './components/MainNavigation';
import AccountPage from './components/AccountPage';
import AppHomePage from './components/AppHomePage';
import HistoryPage from './components/HistoryPage';
import LibraryPage from './components/LibraryPage';
import StoryBook from './components/storybook';
import ProjectsPage from './components/ProjectsPage';
import './PlayerApp.css';

class PlayerApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <MainNavigation />
          <Switch>
            <Route exact path="/" component={AppHomePage} />
            <Route path="/library" component={LibraryPage} />
            <Route path="/storybook" component={StoryBook} />
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
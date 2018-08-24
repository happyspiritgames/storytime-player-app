import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import AccountPage from './components/AccountPage';
import AppHomePage from './components/home';
import HistoryPage from './components/HistoryPage';
import LibraryPage from './components/library';
import StoryBook from './components/storybook';
import ProjectsPage from './components/ProjectsPage';
import './PlayerApp.css';

class PlayerApp extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/library" component={LibraryPage} />
          <Route path="/storybook/:key" component={StoryBook} />
          <Route path="/storybook" component={StoryBook} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/" component={AppHomePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default PlayerApp;
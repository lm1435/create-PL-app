import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CustomLoadable from './services/loadable.service';
import ErrorBoundary from './components/error-boundary/error-boundary';
import AsyncTracker from './components/async-tracker/async-tracker';
import './App.css';

const AsyncHome = CustomLoadable(() => import('./components/home/home'));

const App = () => (
  <ErrorBoundary>
    <AsyncTracker>
      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <Route path="/" exact component={AsyncHome} />
      </Router>
    </AsyncTracker>
  </ErrorBoundary>
);

export default App;

import * as React from 'react';
import {  BrowserRouter as Router, Route } from "react-router-dom"
import { ErrorBoundary } from './components/Error';
import { Dashboard } from './pages/dashboard';
import Login from './pages/login';

const App: React.FC = () => {
  return (
    <Router>
    <ErrorBoundary>
     
        <Route path="/" exact>
          <Login />
        </Route>

        <Route path="/d">
          <Dashboard />
        </Route>
      
       
    </ErrorBoundary>

    </Router>
  );
}


export default App;


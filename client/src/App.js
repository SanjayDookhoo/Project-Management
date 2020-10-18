import React from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter } from 'react-router-dom'
import Risks from './components/Risks'
import Issues from './components/Issues'
import Actions from './components/Actions'
import Reports from './components/Reports'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar />
        <div className="container">
          <Route exact path='/' component={Risks}/>
          <Route path='/risks' component={Risks} />
          <Route path='/issues' component={Issues} />
          <Route path='/actions' component={Actions} />
          <Route path='/reports' component={Reports} />
        </div>
      </div>
  </BrowserRouter>
  );
}

export default App;

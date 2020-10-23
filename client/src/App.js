import React from 'react';
import Navbar from './components/Navbar'
import NavbarHome from './components/NavbarHome'
import { Route, BrowserRouter } from 'react-router-dom'
import Projects from './pages/Projects'
import Risks from './pages/Risks'
import Issues from './pages/Issues'
import Actions from './pages/Actions'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={NavbarHome}/>
        <Route path='/project' component={Navbar}/>
        <div className="container">
          <Route exact path='/' component={Projects}/>
          <Route path='/project/risks' component={Risks} />
          <Route path='/project/issues' component={Issues} />
          <Route path='/project/actions' component={Actions} />
          <Route path='/project/reports' component={Reports} />
        </div>
      </div>
  </BrowserRouter>
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar'
import NavbarHome from './components/NavbarHome'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Projects from './pages/Projects'
import Risks from './pages/Risks'
import Issues from './pages/Issues'
import Actions from './pages/Actions'
import NotFound_404 from './pages/NotFound_404'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={NavbarHome}/>
          <Route exact path={['/project/risks', '/project/issues', '/project/actions']} component={Navbar}/>

           <Route component={NavbarHome} /> {/* if page url was passed that cannot be handled, at least give a path to redirect to the usable site through the header */}
        </Switch>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Projects}/>
            <Route exact path='/project/risks' component={Risks} />
            <Route exact path='/project/issues' component={Issues} />
            <Route exact path='/project/actions' component={Actions} />

            <Route component={NotFound_404} /> {/* Inform the user that the page they are trying to reach does not currently exists */}
          </Switch>
        </div>
      </div>
  </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetail from './components/JobDetail'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './responsive.css'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App

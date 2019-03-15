import { BrowserRouter as Router, Route } from 'react-router-dom'
import Index from './pages'
import Post from './pages/post'

export default props => (
  <Router>
    <div>
      <Route exact path='/' component={Index} />
      <Route exact path='/posts/:id' component={Post} />
    </div>
  </Router>
)

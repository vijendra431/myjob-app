import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

// ProtectedRoute - checks if user is logged in
// If logged in  → show the page ✅
// If not logged in → redirect to /login ❌

class ProtectedRoute extends Component {
  render() {
    const { component: ComponentToRender, ...rest } = this.props
    const token = Cookies.get('jwt_token')

    return (
      <Route
        {...rest}
        render={props => {
          if (token !== undefined) {
            // ✅ User is logged in → show the page
            return <ComponentToRender {...props} />
          } else {
            // ❌ User not logged in → redirect to login
            return <Redirect to="/login" />
          }
        }}
      />
    )
  }
}

export default ProtectedRoute
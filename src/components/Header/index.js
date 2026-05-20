import { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  // logout - remove cookie and redirect to login
  onClickLogout = () => {
    const { history } = this.props

    // remove jwt token from cookies
    Cookies.remove('jwt_token')

    // redirect to login page
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="logo">
          Job<span>Hunt</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

// withRouter gives Header access to history prop
export default withRouter(Header)
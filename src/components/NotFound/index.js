import { Component } from 'react'
import { Link } from 'react-router-dom'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="notfound-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="notfound-image"
        />
        <h1 className="notfound-heading">Page Not Found</h1>
        <p className="notfound-description">
          We are sorry, the page you requested could not be found.
        </p>
        <Link to="/">
          <button type="button" className="home-btn">
            Go Back Home
          </button>
        </Link>
      </div>
    )
  }
}

export default NotFound
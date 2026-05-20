import { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />

        <div className="home-content">
          {/* Hero Section */}
          <div className="hero-section">
            <h1 className="hero-heading">
              Find The Job That <span className="highlight">Fits Your Life</span>
            </h1>
            <p className="hero-description">
              Millions of people are searching for jobs, salary information, company
              reviews. Find the job that fits your abilities and potential.
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-btn">
                Find Jobs
              </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="hero-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
              alt="find and get your best job"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
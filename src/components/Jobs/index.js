import { Component } from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import Header from '../Header'

import './index.css'

// API Status constants
const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  // state
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeEmploymentType: '',
    minimumPackage: '',
  }

  // fetch jobs when component mounts
  componentDidMount() {
    this.getJobs()
  }

  // API call to get jobs list
  getJobs = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading })

    const { searchInput, activeEmploymentType, minimumPackage } = this.state

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      // ✅ API success
      const formattedJobs = data.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobsList: formattedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      // ❌ API failure
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  // search input change
  onChangeSearch = event => {
    this.setState({ searchInput: event.target.value })
  }

  // search button click
  onClickSearch = () => {
    this.getJobs()
  }

  // Enter key press to search
  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  // render each job card
  renderJobCard = job => (
    <Link to={`/jobs/${job.id}`} className="job-link" key={job.id}>
      <li className="job-card">
        <div className="job-card-header">
          <img
            src={job.companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h2 className="job-title">{job.title}</h2>
            <p className="job-rating">⭐ {job.rating}</p>
          </div>
        </div>

        <div className="job-card-body">
          <p className="job-location">📍 {job.location}</p>
          <p className="job-type">💼 {job.employmentType}</p>
          <p className="job-salary">💰 {job.packagePerAnnum}</p>
        </div>

        <hr className="divider" />

        <h3 className="description-heading">Description</h3>
        <p className="job-description">{job.jobDescription}</p>
      </li>
    </Link>
  )

  // render loading spinner
  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  // render failure view
  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h2 className="failure-heading">Oops! Something Went Wrong</h2>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  // render jobs list
  renderJobsList = () => {
    const { jobsList } = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h2 className="no-jobs-heading">No Jobs Found</h2>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(job => this.renderJobCard(job))}
      </ul>
    )
  }

  // render based on API status
  renderContent = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const { searchInput } = this.state

    return (
      <div className="jobs-container">
        <Header />

        <div className="jobs-content">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearch}
              onKeyDown={this.onKeyDownSearch}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.onClickSearch}
            >
              🔍
            </button>
          </div>

          {/* Jobs Content */}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default Jobs
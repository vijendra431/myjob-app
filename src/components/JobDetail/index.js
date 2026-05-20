import { Component } from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

// API status constants
const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetail extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  // fetch job details when component mounts
  componentDidMount() {
    this.getJobDetails()
  }

  // API call to get single job details
  getJobDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading })

    const { match } = this.props
    const { id } = match.params   // get id from URL params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      // ✅ success - format data
      const jobData = data.job_details

      const formattedJobDetails = {
        id: jobData.id,
        companyLogoUrl: jobData.company_logo_url,
        companyWebsiteUrl: jobData.company_website_url,
        employmentType: jobData.employment_type,
        jobDescription: jobData.job_description,
        location: jobData.location,
        packagePerAnnum: jobData.package_per_annum,
        rating: jobData.rating,
        title: jobData.title,
        skills: jobData.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
        lifeAtCompany: {
          description: jobData.life_at_company.description,
          imageUrl: jobData.life_at_company.image_url,
        },
      }

      const formattedSimilarJobs = data.similar_jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobDetails: formattedJobDetails,
        similarJobs: formattedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      // ❌ failure
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  // render loader
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
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  // render job details
  renderJobDetails = () => {
    const { jobDetails, similarJobs } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-detail-container">
        {/* Job Header */}
        <div className="job-detail-card">
          <div className="job-header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <p className="job-rating">⭐ {rating}</p>
            </div>
          </div>

          <div className="job-meta">
            <p>📍 {location}</p>
            <p>💼 {employmentType}</p>
            <p>💰 {packagePerAnnum}</p>
          </div>

          <hr className="divider" />

          {/* Description */}
          <div className="description-header">
            <h2>Description</h2>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit 🔗
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>

          {/* Skills */}
          <h2 className="skills-heading">Skills</h2>
          <ul className="skills-list">
            {skills.map(skill => (
              <li key={skill.name} className="skill-item">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="skill-image"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>

          {/* Life at Company */}
          <h2 className="life-heading">Life at Company</h2>
          <div className="life-container">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-image"
            />
          </div>
        </div>

        {/* Similar Jobs */}
        <h2 className="similar-heading">Similar Jobs</h2>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <li key={job.id} className="similar-job-card">
              <div className="job-header">
                <img
                  src={job.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo"
                />
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-rating">⭐ {job.rating}</p>
                </div>
              </div>
              <h4>Description</h4>
              <p className="job-description">{job.jobDescription}</p>
              <div className="job-meta">
                <p>📍 {job.location}</p>
                <p>💼 {job.employmentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // render based on API status
  renderContent = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-detail-page">
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}

export default JobDetail
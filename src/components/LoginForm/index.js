import { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  // state - stores form data
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  // update username when user types
  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  // update password when user types
  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  // called when login is SUCCESS
  onLoginSuccess = jwtToken => {
    const { history } = this.props

    // save token in cookie
    Cookies.set('jwt_token', jwtToken, { expires: 30 })

    // redirect to home page
    history.replace('/')
  }

  // called when login FAILS
  onLoginFailure = errorMsg => {
    this.setState({ showError: true, errorMsg })
  }

  // called when form is submitted
  onSubmitForm = async event => {
    event.preventDefault()

    const { username, password } = this.state

    const userDetails = { username, password }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    // API call to login
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      // ✅ Login success
      this.onLoginSuccess(data.jwt_token)
    } else {
      // ❌ Login failed
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const { username, password, showError, errorMsg } = this.state

    // if already logged in → redirect to home
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <h1 className="login-heading">JobHunt</h1>

          <form className="login-form" onSubmit={this.onSubmitForm}>
            {/* Username Input */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            {/* Error Message */}
            {showError && <p className="error-msg">*{errorMsg}</p>}

            {/* Submit Button */}
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className='demo'>Demo:- username:rahul,  password:rahul@2021</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

// Write your JS code here
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  const onClickLoginBtn = async event => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = props
      const token = data.jwt_token

      Cookies.set('jwt_token', token, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    }
  }

  return (
    <div className="login-container">
      <h1>Please Login</h1>
      <button onClick={onClickLoginBtn}>Login with Sample Creds</button>
    </div>
  )
}

export default Login

import React from 'react'
import Helmet from 'react-helmet'
import Login from '../../components/login'

const LoginPage = () => (
  <div>
    <Helmet title='Login' />
    <h1>Login</h1>
    <Login />
  </div>
)

export default LoginPage

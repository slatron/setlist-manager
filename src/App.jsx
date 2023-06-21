import {useFetchAuth} from './useFetchAuth'
import LoginForm from './Forms/LoginForm'
import ForgotPasswordForm from './Forms/ForgotPasswordForm'
import api from './api';

import './globals.css'
import './songlist.css'

const App = () => {
  const { loadingUser, user } = useFetchAuth()
  if (loadingUser) return <div className="loading">loading...</div>

  return user.logged_in
    ? <p>
        YOU ARE LOGGED IN
        <button type="button" onClick={() => api.logout()}>Logout</button>
      </p>
    : <>
        <LoginForm/>
        <ForgotPasswordForm />
      </>
}

export default App

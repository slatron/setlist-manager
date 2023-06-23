import React, {useState} from 'react'
import PropTypes from 'prop-types';
import api from '../api'
import {useFormData} from './useFormData'
import './forms.css'
import CommonTemplate from '/src/components/Layout/CommonTemplate';
import { Navigate } from "react-router-dom";

const LoginForm = ({user}) => {
  const {formData, handleSubmit, handleInputChange} = useFormData(handleLogin);
  const [errorMsg, setErrorMsg] = useState('');

  function handleLogin(data) {
    api.login(data.login_email, data.login_pass)
      .catch((error) => setErrorMsg(error.message));
  }

  return (
    <CommonTemplate {...{user}}>
      <div className="form-page-container">
        {user.isAnonymous === false && (
          <Navigate to="/" replace={true} />
        )}
        {errorMsg.length > 0 && (
          <div className="error-message">
            {errorMsg}
          </div>
        )}
        <form className="basic-form" onSubmit={handleSubmit}>
          <div className="field-pair">
            <label htmlFor="login_email">Email </label>
            <input
              type="email"
              name="login_email"
              id="login_email"
              value={formData.login_email || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-pair">
            <label htmlFor="login_pass">Password </label>
            <input
              id="login_pass"
              type="password"
              name="login_pass"
              value={formData.login_pass || ''}
              onChange={handleInputChange}
            />
          </div>
          <button disabled={!formData.login_email || !formData.login_pass} type="submit">login</button>
        </form>
      </div>
    </CommonTemplate>
  )
}

LoginForm.propTypes = {
  user: PropTypes.object.isRequired
};

export default LoginForm;

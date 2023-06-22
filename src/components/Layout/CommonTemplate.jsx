import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderBar from './HeaderBar/HeaderBar';
import Drawer from './Drawer/Drawer';
import api from '/src/api';

import './CommonTemplate.css'
const CommonTemplate = ({children, user}) => {
  const [drawerActive, setDrawerActive] = useState(false);
  const toggleDrawer = () => setDrawerActive(prev => !prev);
  const pathname = window.location.pathname;
  const showLogout = user.isAnonymous === false && pathname !== '/login';

  return (
    <>
      <HeaderBar {...{toggleDrawer, drawerActive}} />
      <Drawer {...{drawerActive, user, toggleDrawer}} />
      {drawerActive && <div onClick={() => setDrawerActive(false)} className="window-shade" />}
      <main>
        <div className="container-user-info">
          <span>Hello, {user.email || 'Guest'}</span>
          {showLogout && <button type="button" onClick={() => api.guestLogin()}>logout</button>}
        </div>
        {children}
      </main>
    </>
  )
}

CommonTemplate.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object.isRequired
}

export default CommonTemplate

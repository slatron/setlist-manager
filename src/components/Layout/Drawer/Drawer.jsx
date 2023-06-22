import React from 'react';
import PropTypes from 'prop-types'
import './Drawer.css'
import { Link } from 'react-router-dom';

const Drawer = ({drawerActive = false, user, toggleDrawer}) => {
  return (
    <nav
      id="drawer"
      className={`${drawerActive ? 'active' : ''}`}
    >
      <ul onClick={toggleDrawer}>
        <li>
          <Link to="/">Setlists</Link>
        </li>
        {user.isAnonymous === false && (
          <li>
            <Link to="/songs">Songs</Link>
          </li>
        )}
        {user.isAnonymous && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li >
          <a href="http://www.mikeslater.com">mikeslater.com</a>
        </li>
      </ul>
    </nav>
  )
}

Drawer.propTypes = {
  drawerActive: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  user: PropTypes.object.isRequired

}

export default Drawer

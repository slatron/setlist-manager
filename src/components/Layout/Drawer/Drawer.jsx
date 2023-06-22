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
      <ul>
        <li onClick={toggleDrawer}>
          <Link to="/">Setlists</Link>
        </li>
        {user.isAnonymous === false && (
          <li onClick={toggleDrawer}>
            <Link to="/songs">Songs</Link>
          </li>
        )}
        {user.isAnonymous && (
          <>
            <li onClick={() => alert('Please login to view/edit songs')}>
              <span>Songs</span>
            </li>
            <li onClick={toggleDrawer}>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        <li>
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

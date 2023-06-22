import React, { useState } from 'react'
import PropTypes from 'prop-types'
import HeaderBar from './HeaderBar/HeaderBar'
import Drawer from './Drawer/Drawer'

import './CommonTemplate.css'

const CommonTemplate = ({children, user}) => {
  const [drawerActive, setDrawerActive] = useState(false)
  const toggleDrawer = () => setDrawerActive(prev => !prev)

  return (
    <>
      <HeaderBar {...{toggleDrawer, drawerActive}} />
      <Drawer {...{drawerActive, user, toggleDrawer}} />
      {drawerActive && <div onClick={() => setDrawerActive(false)} className="window-shade" />}
      <main>
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

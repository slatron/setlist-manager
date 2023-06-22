// This hook returns current user status
import { useState, useEffect } from 'react'
import api from './api'


export const useFetchAuth = () => {
  const [ user, setUser ] = useState({})
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    setLoading(true)
    const loader = api.getLoginObserver((newUser) => {
      setUser(newUser)
      setLoading(false);
      if (window.location.pathname !== '/') window.location.assign('/');
    })
    return () => loader()
  }, [])

  return { loading, user }
}

import { Chilanka } from 'next/font/google'
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex justify-center pt-40'>{children}</div>
  )
}

export default AuthLayout
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { callApiQuyen } from '../../redux/reducers/adminReducer';
import Header from './Header'

export default function Layout() {
    return (
    <div>
      <Header />

      <Outlet />

    </div>
  )
}

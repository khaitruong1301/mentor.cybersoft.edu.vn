import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRoleCom } from '../redux/reducers/adminReducer';

export default function NotFound(props) {
  // useQuyen(props.role);
  const danhSachLop = useSelector(state => state.lopHocReducer.danhSachLop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoleCom(props.role));
  }, [])
  
  return (
    <h1>NotFound</h1>
  )
}

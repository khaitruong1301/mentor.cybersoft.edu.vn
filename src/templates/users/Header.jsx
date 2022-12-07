import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/imgs/react.png';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {/* <li className="nav-item active ">
            <NavLink activeClassName="selected" className={({ isActive }) =>
              "nav-link text-white " + (isActive && "bg-info")
            } to="/" > Trang chủ </NavLink>

          </li> */}
          <li className="nav-item active ">
            <NavLink className={({ isActive}) =>
              "nav-link text-white " + (isActive && "bg-info")
            } to="/lophoc">Lớp học </NavLink>

          </li>

      

          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li> */}

        </ul>

      </div>
    </nav>

  )
}

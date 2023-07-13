import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faRightToBracket, faShoppingCart, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react'; // Import useEffect
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

const Navbar = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Home">
                  Store <FontAwesomeIcon icon={faStore} className="fa-regular fa-store fa-fade" />
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/cart">
                  Cart <FontAwesomeIcon icon={faShoppingCart} className="fa-solid fa-cart-shopping-fast fa-beat-fade" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/signup">
                  Register <FontAwesomeIcon icon={faUserPlus} className="fa-solid fa-user-plus fa-bounce" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/signin">
                  Login <FontAwesomeIcon icon={faRightToBracket} className="fa-regular fa-right-to-bracket fa-fade" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/logout">
                  Logout <FontAwesomeIcon icon={faRightFromBracket} className="fa-solid fa-right-from-bracket fa-beat-fade" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";

import classNames from "./utils/classNames";

export const Navbar = ({ openModal, user }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onOpenBuyDialog = (args) => {
    args.preventDefault();
    openModal();
  };

  const toggleNavbar = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse"
            onClick={toggleNavbar}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div
          className={classNames("navbar-collapse", isPopupOpen && "collapse")}
        >
          <ul className="navbar-nav nav">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#" onClick={onOpenBuyDialog}>
                Buy
              </a>
            </li>
          </ul>
          <span className="navbar-right navbar-text">{user?.balance} gold</span>
        </div>
      </div>
    </div>
  );
};

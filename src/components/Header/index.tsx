import React from 'react';
import './index.scss';

const NaviItems = ['Home', 'About', 'Menu'];

const Header: React.FC = () => {
  return (
    <section className="wrapper">
      <header className="header">
        <div className="logo">Infinite Scroll</div>
        <div className="navi">
          {NaviItems.map((item) => (
            <div key={item} className="naviItem">
              {item}
            </div>
          ))}
        </div>

        <div className="buttonWrapper">
          <button type="button" className="button">
            Button
          </button>
        </div>
      </header>
    </section>
  );
};

export default Header;

import React from 'react';
import './index.scss';

const Header: React.FC = () => {
  return (
    <section className="header">
      <div className="logo">
        Infinite Scroll & Infinite Images{' '}
        <span role="img" aria-label="이모지">
          💫
        </span>
      </div>
    </section>
  );
};

export default Header;

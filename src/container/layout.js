import React from 'react';
import ImageGrid from '../component/image-grid';
import logo from '../logo.svg';

const Layout = () => {
  return (
    <>
      <div className="app-header">
        Welcome
        <div className="header-description">Select any image to know more about it.</div>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="layout">
        <ImageGrid />
      </div>
    </>
  )
}

export default Layout;
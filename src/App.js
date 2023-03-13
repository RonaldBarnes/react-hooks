import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import HookUseState from './HookUseState';
import SideBar from './SideBar';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
			<div className="container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Hooks Lesson Notes</h2>
        </div>
				<SideBar />
				<HookUseState />
				<Footer />
      </div>
    );
  }
}

export default App;

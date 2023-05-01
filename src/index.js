import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";


// import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import './index.css';



const root = ReactDOM.createRoot(
	document.getElementById('root')
	);
root.render(<App />);


/*
// THIS (DEFAULT npm) STYLE OF CREATING root BREAKS HOOK useTransition!
// THIS (DEFAULT npm) STYLE OF CREATING root BREAKS HOOK useTransition!
// THIS (DEFAULT npm) STYLE OF CREATING root BREAKS HOOK useTransition!
// THIS (DEFAULT npm) STYLE OF CREATING root BREAKS HOOK useTransition!
// THIS (DEFAULT npm) STYLE OF CREATING root BREAKS HOOK useTransition!
// THIS (DEFAULT npm) STYLE OF CREATING root BREAKS HOOK useTransition!
// THIS (DEFAULT npm) STYLE OF CREATING root BREAKS HOOK useTransition!
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

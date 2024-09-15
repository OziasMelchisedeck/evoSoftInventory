import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Nav from './components/nav-bar/nav';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/products-page/productPage';
import InventairePage from './pages/inventaire-page/inventaire';
import Formulaire from './components/nav-bar/inventaire-form/form';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router> 
      <Nav />
      <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/produits' element={<ProductPage />}/>
          <Route path='/inventaire' element={<InventairePage />}/>
          <Route path='/inventaire/add' element={<Formulaire />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

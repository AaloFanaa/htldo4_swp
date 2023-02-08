import { useState, useEffect } from 'react';
import './App.css';
import SiteHeader from './components/SiteHeader';
import DisplayUsers from './components/DisplayUsers';

function App() {
  return (
    <div className='app'>
      <SiteHeader></SiteHeader>
      <DisplayUsers></DisplayUsers>
      <div className='chat'>Chat display</div>
    </div>
  );
}

export default App;

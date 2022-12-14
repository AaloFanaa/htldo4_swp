import SimpleButton from './components/SimpleButton';
import TheCalculator from './components/TheCalculator';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [calcString, setCalcString] = useState('');

  return (
    <div className="App">
      <div className="calc">
        <div className="inputDisplay">
          <h1>Simple Calculator</h1>
          <TheCalculator
            strChange={(temp) => {
              setCalcString(temp);
            }}
            strInput={calcString}
          ></TheCalculator>
        </div>
        <div className="buttons">
          <SimpleButton
            handleClick={(temp) => {
              setCalcString(calcString + temp);
            }}
            operator="+"
          ></SimpleButton>
          <SimpleButton
            handleClick={(temp) => {
              setCalcString(calcString + temp);
            }}
            operator="-"
          ></SimpleButton>
          <SimpleButton
            handleClick={(temp) => {
              setCalcString(calcString + '*');
            }}
            operator="x"
          ></SimpleButton>
          <SimpleButton
            handleClick={(temp) => {
              setCalcString(calcString + temp);
            }}
            operator="/"
          ></SimpleButton>
        </div>
        <div className="equal">
          <SimpleButton
            operator="="
            handleClick={(temp) => {
              setCalcString(calcString + temp);
              let sol = eval(calcString);
              setCalcString(sol);
            }}
          ></SimpleButton>
        </div>
      </div>
    </div>
  );
}

export default App;

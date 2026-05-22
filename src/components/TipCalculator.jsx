import React, { useState } from 'react';

const TipCalculator = () => {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState('1');

  const tipPresets = [5, 10, 15, 25, 50];
  
  const billFloat = parseFloat(bill) || 0;
  const tipPercent = customTip !== '' ? parseFloat(customTip) : tip;
  const peopleInt = parseInt(people) || 1;

  // Validation logic
  const billError = bill !== '' && (billFloat <= 0 || isNaN(bill)) 
    ? 'Invalid amount' : '';
  
  const peopleError = (people !== '' && (parseInt(people) < 1 || isNaN(people))) || (bill !== '' && !people)
    ? "Can't be zero" : '';

  const totalTip = (billFloat * tipPercent) / 100;
  const totalBill = billFloat + totalTip;
  const perPerson = Math.ceil((totalBill / peopleInt) * 100) / 100;

  const handleReset = () => {
    setBill('');
    setTip(0);
    setCustomTip('');
    setPeople('1');
  };

  return (
    <div className="app-container">
      <div className="calculator-card">
        
        <div className="input-panel">
          <div className="input-group">
            <div className="label-wrapper">
              <label htmlFor="bill" className="input-label">
                Bill Amount ($)
              </label>
              {billError && <span className="error-message">{billError}</span>}
            </div>
            <input
              id="bill"
              type="number"
              placeholder="0.00"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className={`main-input ${billError ? 'input-invalid' : ''}`}
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              Select Tip %
            </label>
            <div className="tip-grid">
              {tipPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => { setTip(preset); setCustomTip(''); }}
                  className={`tip-option ${tip === preset && !customTip ? 'is-active' : ''}`}
                >
                  {preset}%
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={customTip}
                onChange={(e) => { setCustomTip(e.target.value); setTip(0); }}
                className={`custom-tip-input ${customTip !== '' ? 'is-active' : ''}`}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="label-wrapper">
              <label htmlFor="people" className="input-label">
                Number of People
              </label>
              {peopleError && <span className="error-message">{peopleError}</span>}
            </div>
            <input
              id="people"
              type="number"
              placeholder="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className={`main-input ${peopleError ? 'input-invalid' : ''}`}
            />
          </div>
        </div>

        <div className="display-panel">
          <div className="results-container">
            <div className="result-item">
              <div>
                <p className="result-title">Tip Amount</p>
                <p className="result-subtitle">/ total</p>
              </div>
              <p className="result-amount">
                ${totalTip.toFixed(2)}
              </p>
            </div>

            <div className="result-item total-per-person">
              <div>
                <p className="result-title">Total Person</p>
                <p className="result-subtitle">/ per person</p>
              </div>
              <p className="result-amount large">
                ${perPerson.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            disabled={!bill && tip === 0 && !customTip && people === '1'}
            className="reset-button"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;

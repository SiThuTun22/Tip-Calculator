import React, { useState, useEffect } from 'react';

const TipCalculator = () => {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState('1');
  const [errors, setErrors] = useState({ bill: '', tip: '', people: '' });

  const tipPresets = [5, 10, 15, 25, 50];
  
  // Derived values for calculation
  const billFloat = parseFloat(bill) || 0;
  const tipPercent = customTip !== '' ? parseFloat(customTip) : tip;
  const peopleInt = parseInt(people) || 1;

  // Centralized validation logic
  useEffect(() => {
    const newErrors = { bill: '', tip: '', people: '' };
    
    // Validate Bill
    if (bill !== '' && (parseFloat(bill) <= 0 || isNaN(bill))) {
      newErrors.bill = 'Must be a positive number';
    }

    // Validate Tip (Custom or Preset)
    const activeTip = customTip !== '' ? parseFloat(customTip) : tip;
    if (customTip !== '' && (activeTip < 0 || activeTip > 1000)) {
      newErrors.tip = 'Enter 0-1000%';
    }

    // Validate People
    if (people !== '') {
      const pCount = parseFloat(people);
      if (!Number.isInteger(pCount) || pCount < 1) {
        newErrors.people = 'Must be at least 1 person';
      }
    } else if (bill !== '') {
      newErrors.people = 'Enter number of people';
    }

    setErrors(newErrors);
  }, [bill, tip, customTip, people]);

  // Calculation logic
  const totalTip = (billFloat * tipPercent) / 100;
  const totalBill = billFloat + totalTip;
  
  // Policy: Round up to the nearest cent so the bill is always covered
  const perPerson = Math.ceil((totalBill / peopleInt) * 100) / 100;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        
        {/* Left column: Inputs */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="bill" className="text-sm font-bold text-slate-700">
                Bill Amount ($)
              </label>
              {errors.bill && <span className="text-xs text-red-500 font-medium">{errors.bill}</span>}
            </div>
            <input
              id="bill"
              type="number"
              placeholder="0.00"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className={`w-full bg-slate-50 border-2 p-3 rounded-lg outline-none transition-colors text-slate-800 font-medium ${errors.bill ? 'border-red-400' : 'border-transparent focus:border-emerald-500'}`}
            />
          </div>

          {/* Tip grid */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Select Tip %
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tipPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => { setTip(preset); setCustomTip(''); }}
                  className={`py-3 rounded-lg font-bold text-lg transition-all ${
                    tip === preset && customTip === ''
                      ? 'bg-emerald-500 text-slate-900'
                      : 'bg-slate-800 text-white hover:bg-emerald-200 hover:text-slate-900'
                  }`}
                >
                  {preset}%
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={customTip}
                onChange={(e) => { setCustomTip(e.target.value); setTip(0); }}
                className={`p-3 rounded-lg bg-slate-50 border-2 font-bold text-center outline-none transition-colors ${customTip !== '' ? 'border-emerald-500 text-slate-800' : 'border-transparent text-slate-800'}`}
              />
            </div>
          </div>

          {/* Number of People */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="people" className="text-sm font-bold text-slate-700">
                Number of People
              </label>
              {errors.people && <span className="text-xs text-red-500 font-medium">{errors.people}</span>}
            </div>
            <input
              id="people"
              type="number"
              placeholder="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className={`w-full bg-slate-50 border-2 p-3 rounded-lg outline-none transition-colors text-slate-800 font-medium ${errors.people ? 'border-red-400' : 'border-transparent focus:border-emerald-500'}`}
            />
          </div>
        </div>

        {/* Right column: Display */}
        <div className="flex-1 bg-slate-800 rounded-xl p-8 flex flex-col justify-between">
          <div className="space-y-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-bold text-sm">Tip Amount</p>
                <p className="text-slate-400 text-xs">/ total</p>
              </div>
              <p className="text-4xl font-bold text-emerald-400">
                ${totalTip.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-slate-700 pt-6">
              <div>
                <p className="text-white font-bold text-sm">Total Person</p>
                <p className="text-slate-400 text-xs">/ per person</p>
              </div>
              <p className="text-5xl font-bold text-emerald-400">
                ${perPerson.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;

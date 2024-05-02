import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [exchangerate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`

        // const res = await fetch(url);
        // const data = await res.json();  --- This is for using fetch method

        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toCurrency]);
      }
      
      catch(error){
        console.error("Error fetching exchange rate:", error);
      }
    };
    
    getExchangeRate(); 
  },[fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangerate !== null){
      setconvertedAmount((amount * exchangerate).toFixed(2));
    }
  },[amount, exchangerate])

  const handleAmountonchagne = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }

  const handlefromCurrencyChange = (e) => {
    setfromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    settoCurrency(e.target.value);
  };

  return (
    <>
      <div className='currency-converter'>
        <div className='box'></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" id='amt' value={amount} onChange={handleAmountonchagne}/>
          </div>

          <div className="input-container">
            <label htmlFor="fromCurrency">Form Currency:</label>
            <select  id='fromCurrency' value={fromCurrency} onChange={handlefromCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR- Euro</option>
              <option value="GBP">GBP- British Pound Sterling</option>
              <option value="JPY">JPY- Japenese Yen</option>
              <option value="AUD">AUD- Australian Dollar</option>
              <option value="CAD">CAD- Canadian Dollar</option>
              <option value="CNY">CNY- Chinese Yuan</option>
              <option value="INR">INR- Indian Rupee</option>
              <option value="BRL">BRL- Brazilian Real</option>
              <option value="ZAR">ZAR- South African rand</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="roCurrency">Form Currency:</label>
            <select  id='toCurrency' value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR- Euro</option>
              <option value="GBP">GBP- British Pound Sterling</option>
              <option value="JPY">JPY- Japenese Yen</option>
              <option value="AUD">AUD- Australian Dollar</option>
              <option value="CAD">CAD- Canadian Dollar</option>
              <option value="CNY">CNY- Chinese Yuan</option>
              <option value="INR">INR- Indian Rupee</option>
              <option value="BRL">BRL- Brazilian Real</option>
              <option value="ZAR">ZAR- South African rand</option>
            </select>
            <div className="result">
              <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency} </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App

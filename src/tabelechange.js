import React, { useState, useEffect } from 'react';

const CurrencyTable = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Panggil API untuk mendapatkan data mata uang
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const apiKey = '0fa7f41272a846d68fc0367ef289eda5'; // Ganti dengan API key Anda
      const response = await fetch(
        `https://api.currencyfreaks.com/latest?apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Gagal mengambil data.');
      }

      const data = await response.json();
      const selectedCurrencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

      const currencyList = selectedCurrencies.map((currency) => ({
        currency,
        exchangeRate: parseFloat(data.rates[currency]).toFixed(6),
        weBuy: (parseFloat(data.rates[currency]) * 1.05).toFixed(4),
        weSell: (parseFloat(data.rates[currency]) * 0.95).toFixed(4),
      }));

      setCurrencies(currencyList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="center-table">
      <h1>Currency Exchange Rates</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.currency}>
              <td>{currency.currency}</td>
              <td>{currency.weBuy}</td>
              <td>{currency.exchangeRate}</td>
              <td>{currency.weSell}</td>
            </tr>
          ))}
        </tbody>
        </table><br/>
        <text>Rate are based from 1 USD.</text>
        <text>This application uses API from https://currencyfreaks.com/</text>
    </div>
  );
};

export default CurrencyTable;

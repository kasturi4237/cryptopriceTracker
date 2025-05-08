// src/components/CryptoTable.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCryptos } from '../redux/cryptoSlice';
import CryptoRow from './CryptoRow';
import './CryptoTable.css';

const CryptoTable = () => {
  const cryptos = useSelector(selectAllCryptos);

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th className="hide-mobile">Market Cap</th>
            <th className="hide-mobile">Volume (24h)</th>
            <th className="hide-mobile">Circulating Supply</th>
            <th className="hide-mobile">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map(crypto => (
            <CryptoRow key={crypto.id} crypto={crypto} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
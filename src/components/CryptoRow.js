// src/components/CryptoRow.js
import React, { useState } from 'react';
import './CryptoRow.css';

const CryptoRow = ({ crypto }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const formatPrice = (price) => {
    return price >= 1 
      ? `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
      : `$${price.toFixed(6)}`;
  };

  const formatPercent = (percent) => {
    const formattedValue = percent.toFixed(2);
    const isPositive = percent > 0;
    const isZero = percent === 0;
    
    return (
      <span className={isPositive ? 'positive' : isZero ? 'neutral' : 'negative'}>
        {isPositive ? '▲' : isZero ? '' : '▼'} {Math.abs(formattedValue)}%
      </span>
    );
  };

  const formatLargeNumber = (num) => {
    if (num >= 1_000_000_000_000) {
      return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    }
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  return (
    <tr>
      <td>{crypto.id}</td>
      <td className="name-cell">
        <div className="logo-container">
          {crypto.logo ? (
            <>
              {!imageLoaded && (
                <div className="crypto-logo-placeholder">
                  {crypto.symbol.charAt(0)}
                </div>
              )}
              <img 
                src={crypto.logo} 
                alt={crypto.name} 
                className={`crypto-logo ${imageLoaded ? 'loaded' : 'loading'}`} 
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.onerror = null; 
                  // Replace with backup icon or use parent div as fallback
                  e.target.style.display = 'none';
                  setImageLoaded(false);
                }} 
              />
            </>
          ) : (
            <div className="crypto-logo-placeholder">
              {crypto.symbol.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <span className="crypto-name">{crypto.name}</span>
          <span className="crypto-symbol">{crypto.symbol}</span>
        </div>
      </td>
      <td>{formatPrice(crypto.price)}</td>
      <td>{formatPercent(crypto.change1h)}</td>
      <td>{formatPercent(crypto.change24h)}</td>
      <td>{formatPercent(crypto.change7d)}</td>
      <td className="hide-mobile">{formatLargeNumber(crypto.marketCap)}</td>
      <td className="hide-mobile">{formatLargeNumber(crypto.volume24h)}</td>
      <td className="hide-mobile">{crypto.circulatingSupply.toFixed(2)}M {crypto.symbol}</td>
      <td className="hide-mobile chart-cell">
        <img src={crypto.chart7d} alt="7d chart" className="chart-img" />
      </td>
    </tr>
  );
};

export default React.memo(CryptoRow);
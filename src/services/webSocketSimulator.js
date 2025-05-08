// src/services/webSocketSimulator.js
import { store } from '../redux/store';
import { updateCryptoData } from '../redux/cryptoSlice';

class WebSocketSimulator {
  constructor() {
    this.interval = null;
  }

  connect() {
    this.interval = setInterval(() => {
      this.generateRandomUpdate();
    }, 1500);
    
    return () => this.disconnect();
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  generateRandomUpdate() {
    const cryptos = store.getState().crypto.assets;
    const randomCryptoId = Math.floor(Math.random() * cryptos.length) + 1;
    
    // Generate random price change between -2% and +2%
    const priceChangePercent = (Math.random() * 4 - 2) / 100;
    const currentPrice = cryptos.find(c => c.id === randomCryptoId).price;
    const newPrice = currentPrice * (1 + priceChangePercent);
    
    // Random changes for other values
    const change1h = parseFloat((Math.random() * 2 - 1).toFixed(2));
    const change24h = parseFloat((Math.random() * 4 - 2).toFixed(2));
    const change7d = parseFloat((Math.random() * 6 - 3).toFixed(2));
    const volumeChange = Math.random() * 0.1 - 0.05; // -5% to +5%
    
    const currentVolume = cryptos.find(c => c.id === randomCryptoId).volume24h;
    const newVolume = currentVolume * (1 + volumeChange);
    
    // Dispatch update to Redux
    store.dispatch(updateCryptoData({
      id: randomCryptoId,
      updates: {
        price: parseFloat(newPrice.toFixed(2)),
        change1h,
        change24h,
        change7d,
        volume24h: Math.floor(newVolume),
      }
    }));
  }
}

export default new WebSocketSimulator();
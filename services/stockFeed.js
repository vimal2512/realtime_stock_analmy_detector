import { EventEmitter } from 'events';

class StockFeed extends EventEmitter {
  constructor(stocks) {
    super();
    this.stocks = stocks;
    this.prices = {};

    for (const symbol of stocks) {
      this.prices[symbol] = 100 + Math.random() * 20;

      setInterval(() => {
        const newPrice =
          this.prices[symbol] * (1 + (Math.random() - 0.5) / 50);
        this.prices[symbol] = Number(newPrice.toFixed(2));

        this.emit('priceUpdate', {
          symbol,
          timestamp: Date.now(),
          price: this.prices[symbol],
        });
      }, 1000);
    }
  }
}

export default StockFeed;

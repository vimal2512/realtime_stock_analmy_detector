import config from '../config/stockConfig.json' assert { type: 'json' };
import { createAlert } from './alertManager.js';

const priceHistory = {};

const detectAnomaly = ({ symbol, price, timestamp }) => {
  const conf = config[symbol];
  if (!conf) return;

  if (conf.strategy === 'spike') {
    if (!priceHistory[symbol]) priceHistory[symbol] = [];
    const history = priceHistory[symbol];

    history.push({ price, timestamp });
    const windowMs = conf.windowSec * 1000;
    const cutoff = timestamp - windowMs;

    const recentPrices = history.filter(p => p.timestamp >= cutoff);
    const firstPrice = recentPrices[0]?.price;

    if (firstPrice) {
      const change = ((price - firstPrice) / firstPrice) * 100;
      if (Math.abs(change) > conf.thresholdPercent) {
        createAlert(symbol, timestamp, `Spike of ${change.toFixed(2)}%`);
      }
    }

    priceHistory[symbol] = recentPrices;
  }

  if (conf.strategy === 'movingAverage') {
    if (!priceHistory[symbol]) priceHistory[symbol] = [];
    const history = priceHistory[symbol];

    history.push(price);
    if (history.length > conf.sampleSize) history.shift();

    const avg = history.reduce((a, b) => a + b, 0) / history.length;
    const deviation = ((price - avg) / avg) * 100;

    if (Math.abs(deviation) > conf.deviationPercent) {
      createAlert(symbol, timestamp, `Deviation of ${deviation.toFixed(2)}% from MA`);
    }
  }
};

export default detectAnomaly;

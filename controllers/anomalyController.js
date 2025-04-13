// Import necessary dependencies
import { alertSystem } from '../alertSystem'; // Alert system to emit or store alerts
import { getStockData, updateStockData } from '../stockData'; // Functions to get and update stock data

// Helper function to calculate moving average
const calculateMovingAverage = (data, sampleSize) => {
  if (data.length < sampleSize) return null;
  const recent = data.slice(-sampleSize);
  const sum = recent.reduce((a, b) => a + b, 0);
  return sum / sampleSize;
};

class AnomalyController {

  // Detect anomaly based on spike in price
  static detectSpikeAnomaly = (stockSymbol, newPrice, timestamp, config) => {
    const { thresholdPercent, windowSec } = config;

    // Get previous stock data
    const previousStockData = getStockData(stockSymbol);

    if (!previousStockData || !previousStockData.lastPrice) return; // If no data is available, return

    // Calculate the price change percentage
    const priceChange = ((newPrice - previousStockData.lastPrice) / previousStockData.lastPrice) * 100;

    // Check if the price change exceeds the threshold
    if (Math.abs(priceChange) > thresholdPercent) {
      // If anomaly is detected, create an alert
      const alert = {
        symbol: stockSymbol,
        timestamp,
        reason: `Price changed by ${priceChange.toFixed(2)}%, which exceeds the threshold of ${thresholdPercent}%`,
      };
      alertSystem.emitAlert(alert); // Emit alert
    }

    // Update stock data
    updateStockData(stockSymbol, newPrice, timestamp);
  };

  // Detect anomaly based on moving average deviation
  static detectMovingAverageAnomaly = (stockSymbol, newPrice, timestamp, config) => {
    const { deviationPercent, sampleSize } = config;

    // Get the last N stock data points for moving average calculation
    const stockData = getStockData(stockSymbol);

    if (!stockData || stockData.prices.length < sampleSize) return; // If not enough data points, return

    // Calculate the moving average
    const movingAverage = calculateMovingAverage(stockData.prices, sampleSize);

    // Calculate the deviation percentage
    const deviation = ((newPrice - movingAverage) / movingAverage) * 100;

    // Check if the price deviates more than the threshold
    if (Math.abs(deviation) > deviationPercent) {
      // If anomaly is detected, create an alert
      const alert = {
        symbol: stockSymbol,
        timestamp,
        reason: `Price deviated by ${deviation.toFixed(2)}% from the moving average, which exceeds the threshold of ${deviationPercent}%`,
      };
      alertSystem.emitAlert(alert); // Emit alert
    }

    // Update stock data
    updateStockData(stockSymbol, newPrice, timestamp);
  };

  // Main anomaly detection function (calls both spike and moving average anomaly detection)
  static detectAnomaly = (stockSymbol, newPrice, timestamp, config) => {
    const { strategy } = config;

    if (strategy === 'spike') {
      this.detectSpikeAnomaly(stockSymbol, newPrice, timestamp, config);
    } else if (strategy === 'movingAverage') {
      this.detectMovingAverageAnomaly(stockSymbol, newPrice, timestamp, config);
    }
  };
}

export default AnomalyController;

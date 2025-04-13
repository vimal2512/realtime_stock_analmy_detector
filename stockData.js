const stockDataMap = {};

export const getStockData = (symbol) => stockDataMap[symbol] || { prices: [], lastPrice: null };

export const updateStockData = (symbol, newPrice, timestamp) => {
  if (!stockDataMap[symbol]) {
    stockDataMap[symbol] = { prices: [], lastPrice: null };
  }
  stockDataMap[symbol].prices.push(newPrice);
  stockDataMap[symbol].lastPrice = newPrice;
};

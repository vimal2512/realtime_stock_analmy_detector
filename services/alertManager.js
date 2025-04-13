const alerts = [];

export const createAlert = (symbol, timestamp, reason) => {
  const alert = { symbol, timestamp, reason };
  alerts.push(alert);
  if (alerts.length > 10) alerts.shift();
  console.log(' Alert:', alert);
};

export const getLastAlerts = () => alerts.slice(-10).reverse();



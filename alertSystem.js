const alerts = [];

export const alertSystem = {
  emitAlert: (alert) => {
    console.log('ALERT:', alert);
    alerts.push(alert);
  },
  getAlerts: () => alerts,
};

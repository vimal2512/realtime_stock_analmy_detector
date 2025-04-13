# AnolmyDet - Anomaly Detection System for Stock Data

## Overview

AnolmyDet is a Node.js-based backend application designed to detect anomalies in stock market data. It monitors real-time stock data, identifies anomalies using a defined threshold or detection logic, and triggers alerts based on configurations.

## Features

- Monitors live stock market data
- Detects anomalies based on configured rules
- Sends alerts when anomalies are detected
- Modular and extensible architecture

## Tech Stack

- **Node.js** - Backend runtime environment
- **Express.js** - Web framework for Node.js
- **dotenv** - Loads environment variables from `.env`
- **Custom Configs** - JSON-based configurations for flexibility

## 📁 Project Structure

```
anolmydet/
└── server/
    ├── app.js                      # Express app setup
    ├── server.js                   # Entry point for the server
    ├── stockData.js                # Handles fetching and managing stock data
    ├── alertSystem.js              # Orchestrates alert triggers and system notifications
    ├── controllers/
    │   └── anomalyController.js    # Controller for anomaly detection routes
    ├── routes/
    │   └── alertRoutes.js          # Defines API routes for alerts
    ├── services/
    │   ├── alertManager.js         # Logic to handle alerts and notifications
    │   ├── anomalyDetector.js      # Business logic for anomaly detection
    │   └── stockFeed.js            # Feeds mock or real-time stock data into the system
    ├── config/
    │   └── stockConfig.json        # Thresholds and settings for monitored stocks
    ├── .env                        # Environment variables (ignored in Git)
    ├── package.json                # Node.js dependencies and metadata

```

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vimal2512/realtime_stock_analmy_detector.git
cd anolmydet/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the `server` directory with the following structure:

```env
SECRET_KEY=secure_key_123
```

### 4. Start the Server

```bash
node server.js
# or
npm run dev
```

## Example Usage

Once the server is running, it will continuously monitor stock data defined in `config/stockConfig.json`, and any anomalies found will be logged or alerted using the logic in `alertSystem.js`.

## Future Improvements

- Integrate with a real-time stock data API (currently assumes mock/static)
- Add support for WebSocket notifications
- Frontend dashboard for visual anomaly tracking

## Author

Vimal Raj P. – [GitHub](https://github.com/vimal2512)

---

>  For any issues, feel free to raise them in the Issues section.

"use client"
import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const TradingView = () => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [candleSeries, setCandleSeries] = useState(null);
  const [smaSeries, setSmaSeries] = useState(null);
  const [rsiSeries, setRsiSeries] = useState(null);
  const [buySignals, setBuySignals] = useState([]);
  const [sellSignals, setSellSignals] = useState([]);
  const [symbol, setSymbol] = useState('BTCUSDT'); // Default to BTC/USDT

  const calculateSMA = (data, period) => {
    const sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i >= period - 1) {
        const slice = data.slice(i - period + 1, i + 1);
        const avg = slice.reduce((sum, item) => sum + item.close, 0) / period;
        sma.push({ time: data[i].time, value: avg });
      }
    }
    return sma;
  };

  const calculateRSI = (data, period) => {
    const rsi = [];
    for (let i = period; i < data.length; i++) {
      let gain = 0;
      let loss = 0;

      for (let j = i - period; j < i; j++) {
        const change = data[j + 1].close - data[j].close;
        if (change > 0) {
          gain += change;
        } else {
          loss -= change;
        }
      }

      const avgGain = gain / period;
      const avgLoss = loss / period;

      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsiValue = 100 - 100 / (1 + rs);
      rsi.push({ time: data[i].time, value: rsiValue });
    }
    return rsi;
  };

  const generateSignals = (data, smaData, rsiData) => {
    const newBuySignals = [];
    const newSellSignals = [];

    for (let i = 1; i < data.length; i++) {
      const price = data[i];
      const rsiValue = rsiData[i - 1]?.value;
      const smaValue = smaData[i - 1]?.value;

      // Buy signal: RSI below 30 and price crossing above SMA
      if (rsiValue < 30 && price.close > smaValue) {
        newBuySignals.push({
          time: price.time,
          price: price.close,
        });
      }

      // Sell signal: RSI above 70 and price crossing below SMA
      if (rsiValue > 70 && price.close < smaValue) {
        newSellSignals.push({
          time: price.time,
          price: price.close,
        });
      }
    }

    setBuySignals(newBuySignals);
    setSellSignals(newSellSignals);
  };

  const fetchMarketData = async (symbol) => {
    if (!candleSeries || !smaSeries || !rsiSeries) {
      console.warn("Series not initialized yet.");
      return;
    }

    try {
      const response = await axios.get('https://api.binance.com/api/v3/klines', {
        params: {
          symbol,
          interval: '1h',
        },
      });

      const formattedData = response.data.map((item) => ({
        time: item[0] / 1000, // Convert to seconds
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      }));

      candleSeries.setData(formattedData);

      // Calculate and set SMA and RSI data
      const smaData = calculateSMA(formattedData, 14); // SMA with period 14
      const rsiData = calculateRSI(formattedData, 14); // RSI with period 14

      smaSeries.setData(smaData);
      rsiSeries.setData(rsiData);

      // Generate buy/sell signals
      generateSignals(formattedData, smaData, rsiData);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  useEffect(() => {
    // Initialize chart
    const newChart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        backgroundColor: '#FFFFFF',
        textColor: '#000',
      },
      grid: {
        vertLines: {
          color: '#e0e0e0',
        },
        horzLines: {
          color: '#e0e0e0',
        },
      },
      priceScale: {
        borderColor: '#cccccc',
      },
      timeScale: {
        borderColor: '#cccccc',
      },
    });

    const newCandleSeries = newChart.addCandlestickSeries();
    const newSmaSeries = newChart.addLineSeries({
      color: 'blue',
      lineWidth: 2,
      visible: false, // Initially hidden
    });
    const newRsiSeries = newChart.addLineSeries({
      color: 'red',
      lineWidth: 1,
      visible: false, // Initially hidden
    });

    setChart(newChart);
    setCandleSeries(newCandleSeries);
    setSmaSeries(newSmaSeries);
    setRsiSeries(newRsiSeries);
  }, []);

  useEffect(() => {
    if (candleSeries && smaSeries && rsiSeries) {
      fetchMarketData(symbol);
    }
  }, [candleSeries, smaSeries, rsiSeries, symbol]);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
  };

  const toggleSMA = () => {
    if (smaSeries) {
      smaSeries.applyOptions({ visible: !smaSeries.visible });
    }
  };

  const toggleRSI = () => {
    if (rsiSeries) {
      rsiSeries.applyOptions({ visible: !rsiSeries.visible });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="w-full max-w-7xl">
        <h1 className="text-center text-2xl mb-6">Trading View</h1>
        <div className="text-center mb-6">
          <input
            type="text"
            value={symbol}
            onChange={handleSymbolChange}
            placeholder="Enter trading pair (e.g., BTCUSDT)"
            className="px-4 py-2 w-80 border border-gray-300 rounded-md"
          />
        </div>
        <div
          ref={chartContainerRef}
          style={{ position: 'relative', width: '100%', height: '500px' }}
        />
        <div className="text-center mt-6">
          <button onClick={toggleSMA} className="px-6 py-2 mx-2 bg-blue-500 text-white rounded-lg">
            Toggle SMA
          </button>
          <button onClick={toggleRSI} className="px-6 py-2 mx-2 bg-red-500 text-white rounded-lg">
            Toggle RSI
          </button>
        </div>

        {/* Display Buy/Sell signals */}
        <div className="mt-4 text-center">
          <h2 className="text-xl">Signals</h2>
          <div className="mt-2">
            <p className="text-green-600">Buy Signals:</p>
            {buySignals.map((signal, index) => (
              <div key={index}>Time: {new Date(signal.time * 1000).toLocaleString()} - Price: ${signal.price}</div>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-red-600">Sell Signals:</p>
            {sellSignals.map((signal, index) => (
              <div key={index}>Time: {new Date(signal.time * 1000).toLocaleString()} - Price: ${signal.price}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingView;

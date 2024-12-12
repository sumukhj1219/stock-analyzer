"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartOptions = {
  chart: {
    type: "candlestick",
    height: 350,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "Stock Candlestick Chart",
    align: "center",
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      style: {
        fontSize: "12px",
        colors: "#888",
      },
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        fontSize: "12px",
        colors: "#888",
      },
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#00e396",
        downward: "#ff4560",
      },
      wick: {
        useFillColor: true,
      },
      barWidth: "5",
    },
  },
  tooltip: {
    enabled: true,
    shared: true,
    theme: "dark",
    x: {
      formatter: function (val) {
        return new Date(val).toLocaleString();
      },
    },
    y: {
      formatter: function (val) {
        return `$${val.toFixed(2)}`;
      },
    },
  },
};

export default function DisplayCandleSticks() {
  const [symbol, setSymbol] = useState("");
  const [interval, setInterval] = useState("1min");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stocks?symbol=${symbol}&interval=${interval}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setStockData(null);
      } else {
        setStockData(data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch stock data.");
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  const processCandlestickData = (data) => {
    const timeSeries = data[`Time Series (${interval})`];
    if (!timeSeries) return [];

    return Object.keys(timeSeries).map((time) => {
      const { "1. open": open, "2. high": high, "3. low": low, "4. close": close } = timeSeries[time];
      return {
        x: new Date(time),
        y: [parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close)],
      };
    });
  };

  useEffect(() => {
    if (symbol) {
      fetchStockData();
    }
  }, [interval]); // Trigger fetch on interval change

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol) {
      fetchStockData();
    } else {
      setError("Please enter a stock symbol.");
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto p-6 bg-secondary border-2 border-black">
      <div className="absolute -z-50 -bottom-3 -right-3 shadow-lg w-full h-full bg-black"></div>

      <h1 className="text-3xl font-extrabold text-center mb-6 text-primary">Stock Analyzer 🧑‍🔬</h1>
      <span className="text-sm text-muted-foreground flex items-center justify-center m-5">
        Our Stock analyzer allows you to pick the stock symbol of your choice and get the in-depth analysis.
      </span>
      <form onSubmit={handleSubmit} className="flex justify-center mb-6">
        <Input
          type="text"
          placeholder="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="px-4 py-2 border rounded-md text-lg mr-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Fetch Data
        </Button>
      </form>

      <div className="mb-6 text-center">
        <Select
          value={interval}
          onValueChange={setInterval} // Update interval directly
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1min">1 Minute</SelectItem>
            <SelectItem value="5min">5 Minutes</SelectItem>
            <SelectItem value="15min">15 Minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-red-500 text-center text-lg">{error}</p>}
      {loading && <p className="text-center text-lg">Loading...</p>}

      {stockData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
            Stock Data for {symbol} ({interval})
          </h2>
          <ReactApexChart
            options={chartOptions}
            series={[{ data: processCandlestickData(stockData) }]}
            type="candlestick"
            height={350}
          />
        </div>
      )}
    </div>
  );
}

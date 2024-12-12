// app/api/stocks/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) {
      console.error("Missing stock symbol in query");
      return NextResponse.json({ error: "Stock symbol is required" }, { status: 400 });
    }

    const API_KEY = "T787LPIWYMXA3Z8L"; 
    const INTERVAL = "1min";
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${INTERVAL}&apikey=${API_KEY}`;

    console.log("Fetching data from:", url);

    const response = await axios.get(url);

    if (response.data["Error Message"]) {
      console.error("Alpha Vantage error:", response.data["Error Message"]);
      return NextResponse.json(
        { error: "Invalid stock symbol or API issue" },
        { status: 400 }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch stock data", details: error.message },
      { status: 500 }
    );
  }
}

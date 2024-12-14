import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(req) {
    try {
        const { message } = await req.json();
        const apiKey = "AIzaSyD_rLI5kJQpFM0DoVTPWO3nwTlEZSZww6w";

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [
              
            ],
        });

        const result = await chatSession.sendMessage(message);
        const aiResponse = result.response.text();

        return NextResponse.json({ message: aiResponse });
    } catch (error) {
        console.error("Error:", error.message); // Improved error logging
        return NextResponse.json({ message: "Internal Server Error" }, { status:500})
    }
  }

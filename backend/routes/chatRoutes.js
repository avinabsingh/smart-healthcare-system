const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are a healthcare assistant.
- Give only basic health advice
- Do NOT diagnose serious diseases
- Always suggest consulting a doctor
- If symptoms are severe → say "Seek immediate medical help"
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    console.log("FULL RESPONSE:", completion);

    const reply =
      completion?.choices?.[0]?.message?.content || "No response from AI";

    res.json({ reply });

  } catch (err) {
    console.error("❌ CHAT ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Chatbot failed",
      details: err.message,
    });
  }
});

module.exports = router;
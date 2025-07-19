const express = require("express");
const jsonServer = require("json-server");
const axios = require("axios");
const cors = require("cors");

const BOT_TOKEN = "7774220625:AAHS8YcVttpEcewgsuvzzJWhqlNvM_S1g4w";
const CHAT_ID = "-1002833288678";

const server = express();
const router = jsonServer.router("db.json"); // ✅ Your db file
const middlewares = jsonServer.defaults();

server.use(cors({ origin: "*" }));
server.use(express.json());
server.use(middlewares);

// Health check
server.get("/", (req, res) => {
    res.send("✅ Server is running and healthy.");
});

// Telegram sending route
server.post("/send-result", async (req, res) => {
    const {
        name, lastname, age, birthdate, phoneNumber,
        score, correctAnswers, level, category, branch, levelStats
    } = req.body;

    console.log("Incoming /send-result data:", req.body);

    let max = 0;
    switch (category) {
        case "Beginner": max = 13; break;
        case "Beg - Ele": max = 32; break;
        case "Ele - Pre-Inter": max = 44; break;
        case "Pre-Inter - Inter": max = 68; break;
        default: max = 100;
    }

    const message = `
🎓 *New Test Result!*
👤 Name: ${name}
👥 Lastname: ${lastname}
🎉 Age: ${age}
📆 Birthdate: ${birthdate}
📲 Phone-Number: ${phoneNumber}
✅ Correct Answers: ${correctAnswers}
📚 Category: ${category}
📍 Branch: ${branch}
📊 Score: ${score}/${max}
📈 Level: ${level}
Beginner: ${levelStats?.Beginner}
Elementary: ${levelStats?.Elementary}
Pre-intermediate: ${levelStats?.["Pre-Intermediate"]}
Intermediate: ${levelStats?.Intermediate}
  `;

    try {
        const tgRes = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });

        console.log("✅ Telegram message sent:", tgRes.data);
        res.send({ success: true });
    } catch (error) {
        console.error("❌ Telegram error:", error.response?.data || error.message);
        res.status(500).send({ success: false, error: error.message });
    }
});

// ✅ Mount json-server router here to enable /Users, /Result
server.use(router);

// Optional logger
server.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ JSON Server running on port ${PORT}`);
});

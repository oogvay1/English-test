const BOT_TOKEN = "7774220625:AAHS8YcVttpEcewgsuvzzJWhqlNvM_S1g4w";
const CHAT_ID = "-1002833288678";

const jsonServer = require("json-server");
const axios = require("axios");
const cors = require("cors");
const express = require("express");

const server = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(express.json());
server.use(middlewares);

server.post("/send-result", async (req, res) => {
    const { name, lastname, age, birthdate, phoneNumber, score, correctAnswers, level, totalLength, category, branch } = req.body;
console.log(totalLength)
    const message = `🎓 *New Test Result!*\n👤 Name: ${name}\n👥 Lastname: ${lastname}\n🎉 Age: ${age}\n📆 Birthdate: ${birthdate}\n📲 Phone-Number: ${phoneNumber}\n✅ Correct Answers: ${correctAnswers}\n📚 Category: ${category}\n📍 Branch: ${branch}\n📊 Score: ${score}/${totalLength}\n📈 Level: ${level}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });

        res.send({ success: true });
    } catch (error) {
        console.error("Telegram error:", error.response?.data || error.message);
        res.status(500).send({ success: false });
    }
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ JSON Server running on port ${PORT}`);
});

const jsonServer = require("json-server");
const axios = require("axios"); // Needed to send messages to Telegram
const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const port = process.env.PORT || 8080;

// 🔐 Telegram Config
const TELEGRAM_TOKEN = "7774220625:AAHS8YcVttpEcewgsuvzzJWhqlNvM_S1g4w"; // Your real token
const CHAT_ID = "-4857180592"; // Replace with your group chat ID (starts with -100...)

server.post("/Result", async (req, res, next) => {
    const result = req.body;

    const message = `
  📢 New Test Submission:
  👤 ${result.name} ${result.lastname}
  🎂 Age: ${result.age}
  📞 Phone: ${result.phoneNumber}
  📊 Score: ${result.score}
  ✅ Correct: ${result.correctAnswers}
  🎯 Level: ${result.level}
  🏢 Branch: ${result.branch}
  📚 Category: ${result.category}
  🕒 Date: ${new Date().toLocaleString()}
  `;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
    } catch (err) {
        console.error("Telegram Send Error:", err.message);
    }

    next(); // pass to json-server to save
});


server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});

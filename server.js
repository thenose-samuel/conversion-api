const { readFileSync, readFile } = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;

// const MathJax = require("mathjax-node");
// MathJax.start();
const _404Page = readFileSync("./src/404.html", "utf-8");

app.get("/", (req, res) => {
  const docsPage = readFileSync("./src/index.html", "utf-8");
  res.send(docsPage);
});

app.get("/api", (req, res) => {
  const conversion = readFileSync("conversion.json", "utf-8");
  const imports = JSON.parse(conversion);
  if (req.query.type == null || req.query.num == null) {
    res.status(404).send(_404Page);
  }
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
app.get("/*", (req, res) => {
  res.status(404).send(_404Page);
});
app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

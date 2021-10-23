const { writeFileSync } = require("fs");
const MathJax = require("mathjax-node");

MathJax.start();

function writer(line) {
  MathJax.typeset(
    {
      math: line,
      format: "TeX",
      mml: true,
    },
    (data) => {
      writeFileSync("temp.html", data.mml, { flag: "a+" }, (error) => {
        if (error) {
          console.log("An error has occured");
        } else {
          console.log("Write successful");
        }
      });
    }
  );
}

async function kilometerToMeter(input) {
  init = `<script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`;
  writeFileSync("./temp.html", init, { flag: "w" });
  let line = `To \\; convert \\; ${input} \\; from \\; \\frac{km}{hr} \\; to \\; \\frac{m}{s}`;
  writer(line);
  //Conversion
  input = parseFloat(input);
  line = `${input}\\frac{km}{hr}=\\frac{${input}*1000}{3600}\\frac{m}{s}`;
  writer(line);
  line = `=\\frac{${input * 1000}}{3600}\\frac{m}{s}`;
  writer(line);
  line = `=${(input * 1000) / 3600}\\frac{m}{s}`;
  writer(line);
}

module.exports = kilometerToMeter;

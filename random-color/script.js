// ! ////////////////////
// ! Utils declaration //
// ! ////////////////////
function RandomColor() {
  // * Generates random colors
  let r = Math.random();
  let g = Math.random();
  let b = Math.random();

  // * Define norm
  let n = Math.sqrt(r * r + g * g + b * b);

  // * Normalize color
  r = Math.floor((255 * r) / n);
  g = Math.floor((255 * g) / n);
  b = Math.floor((255 * b) / n);

  return { r, g, b };
}

function ColorHEX(color) {
  // * Return hexadecimal string format of color
  let rHex = color.r.toString(16).toUpperCase();
  let gHex = color.g.toString(16).toUpperCase();
  let bHex = color.b.toString(16).toUpperCase();
  return `#${rHex}${gHex}${bHex}`;
}

function ColorRGB(color) {
  // * Return RGB string format of color
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function copyToClipboard(text) {
  // * Copy text value to the clipboard
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

// ! /////////////
// ! Define SVG //
// ! /////////////
// * SVG namespace
let _SVG_NS = "http://www.w3.org/2000/svg";
let _XLINK_NS = "http://www.w3.org/1999/xlink";

let DIV = document.getElementById("show-color");
let SVG = document.createElementNS(_SVG_NS, "svg");
let DEFS = document.createElementNS(_SVG_NS, "defs");

SVG.appendChild(DEFS);

const WIDTH = 165;
const HEIGHT = 80;

SVG.setAttribute("version", "1.1");
SVG.setAttribute("xmlns", _SVG_NS);
SVG.setAttribute("width", WIDTH);
SVG.setAttribute("height", HEIGHT);

// ! Defs
// * Rectangle
let rect = document.createElementNS(_SVG_NS, "rect");
rect.id = "rectangle-base";

rect.setAttribute("width", WIDTH);
rect.setAttribute("height", HEIGHT);

DEFS.appendChild(rect);

// * Gradient
let grad = document.createElementNS(_SVG_NS, "linearGradient");
grad.id = "gradient-reflect";

grad.setAttribute("x1", 0);
grad.setAttribute("x2", 1);
grad.setAttribute("y1", 1);
grad.setAttribute("y2", 0);

// * Gradient stops
let stop1 = document.createElementNS(_SVG_NS, "stop");
stop1.setAttribute("offset", "0%");
stop1.setAttribute("stop-color", "black");

let stop2 = document.createElementNS(_SVG_NS, "stop");
stop2.setAttribute("offset", "100%");
stop2.setAttribute("stop-color", "white");

grad.appendChild(stop1);
grad.appendChild(stop2);
DEFS.appendChild(grad);

// ! Uses
// * Fill color
let COLOR = RandomColor();
use1 = document.createElementNS(_SVG_NS, "use");
use1.setAttributeNS(_XLINK_NS, "href", `#${rect.id}`);
use1.setAttribute("fill", ColorRGB(COLOR));

// * Gradient lighting
use2 = document.createElementNS(_SVG_NS, "use");
use2.setAttributeNS(_XLINK_NS, "href", `#${rect.id}`);
use2.setAttribute("fill", `url(#${grad.id})`);
use2.setAttribute("style", "mix-blend-mode: screen;");
use2.setAttribute("opacity", 0.5);

SVG.appendChild(use1);
SVG.appendChild(use2);

DIV.appendChild(SVG);

// ! /////////////////
// ! Event listener //
// ! /////////////////
document.querySelector("#reload").addEventListener("click", function () {
  COLOR = RandomColor();
  use1.setAttribute("fill", ColorRGB(COLOR));
});

document.querySelector("#copy-hex").addEventListener("click", function () {
  let outHEX = ColorHEX(COLOR);
  copyToClipboard(outHEX);
  document.querySelector("#result").innerHTML = `${outHEX} copied!`;
});

document.querySelector("#copy-rgb").addEventListener("click", function () {
  let outRGB = ColorRGB(COLOR);
  copyToClipboard(outRGB);
  document.querySelector("#result").innerHTML = `${outRGB} copied!`;
});

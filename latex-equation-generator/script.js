const codecogs_url = "https://codecogs.com/gif.latex?";

// ! Prototypes
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// ! Init input menu options
// * LaTeX Size
let latexSize = document.getElementById("latexSize");
const sizeList = ["tiny", "small", "normal", "large", "huge"];
sizeList.forEach((element) => {
  let option = document.createElement("option");
  option.value = element;
  option.innerText = element.capitalize();
  latexSize.append(option);
});

// * LaTeX Color
let latexColor = document.getElementById("latexColor");
const colorList = [
  "black",
  "gray",
  "red",
  "green",
  "blue",
  "cyan",
  "magenta",
  "orange",
  "purple",
];
colorList.forEach((element) => {
  let option = document.createElement("option");
  option.value = element;
  option.innerText = element.capitalize();
  option.style = `color: ${element};`;
  latexColor.append(option);
});

// ! Main program
let latexInput = document.getElementById("latexInput");
let latexOutput = document.getElementById("latexOutput");

let textValue, sizeValue, colorValue;

document.addEventListener("DOMContentLoaded", function () {
  loadLastInputValue();
});

// * Event listeners
latexInput.oninput = function () {
  textValue = latexInput.value;
  storeLastInputValue();
  setOutputImage();
};

latexSize.oninput = function () {
  sizeValue = latexSize.value;
  storeLastInputValue();
  setOutputImage();
};

latexColor.oninput = function () {
  colorValue = latexColor.value;
  latexColor.style = `color: ${colorValue};`;
  storeLastInputValue();
  setOutputImage();
};

// * Main functions
function loadLastInputValue() {
  // ? Load last input value
  chrome.storage.local.get(
    ["ccLastTextValue", "ccLastSizeValue", "ccLastColorValue"],
    function (value) {
      textValue = latexInput.value =
        value.ccLastTextValue || String.raw`\frac{1}{N} \sum_i^N x_i`;
      sizeValue = latexSize.value = value.ccLastSizeValue || "normal";
      colorValue = latexColor.value = value.ccLastColorValue || "black";
      latexInput.dispatchEvent(new Event("input"));
      latexSize.dispatchEvent(new Event("input"));
      latexColor.dispatchEvent(new Event("input"));
    }
  );
}

function storeLastInputValue() {
  // ? Store last input value
  chrome.storage.local.set(
    {
      ccLastTextValue: textValue,
      ccLastSizeValue: sizeValue,
      ccLastColorValue: colorValue,
    },
    function () {}
  );
}

function setOutputImage() {
  // ? Set output image
  console.log("ok1", sizeValue, colorValue);
  let output = `\\${sizeValue} `;
  output += `\\color{${colorValue.capitalize()}} `;
  output += textValue;
  latexOutput.src = `${codecogs_url}${output}`;
}

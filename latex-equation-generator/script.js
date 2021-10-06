const google_charts_url = "https://chart.googleapis.com/chart?";

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

// * LaTeX Color and BG
let latexColor = document.getElementById("latexColor");
let latexBG = document.getElementById("latexBG");

// ! Main program
let latexInput = document.getElementById("latexInput");
let latexOutput = document.getElementById("latexOutput");

let textValue, sizeValue, colorValue, bgValue;

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
  storeLastInputValue();
  setOutputImage();
};

latexBG.oninput = function () {
  bgValue = latexBG.value;
  storeLastInputValue();
  setOutputImage();
};

// * Main functions
function loadLastInputValue() {
  // ? Load last input value
  chrome.storage.local.get(
    ["ccLastTextValue", "ccLastSizeValue", "ccLastColorValue", "ccLastBGValue"],
    function (value) {
      textValue = latexInput.value =
        value.ccLastTextValue ||
        String.raw`\displaystyle \frac{1}{N} \sum_i^N x_i`;
      sizeValue = latexSize.value = value.ccLastSizeValue || "normal";
      colorValue = latexColor.value = value.ccLastColorValue || "#000000";
      bgValue = latexBG.value = value.ccLastBGValue || "#FFFFFF";
      latexInput.dispatchEvent(new Event("input"));
      latexSize.dispatchEvent(new Event("input"));
      latexColor.dispatchEvent(new Event("input"));
      latexBG.dispatchEvent(new Event("input"));
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
      ccLastBGValue: bgValue,
    },
    function () {}
  );
}

function setOutputImage() {
  // ? Set output image
  let output = "cht=tx";
  output += `&chf=bg,s,${bgValue.replace("#", "")}`;
  output += `&chco=${colorValue.replace("#", "")}`;
  output += `&chl=\\${sizeValue} ${textValue}`;
  latexOutput.src = `${google_charts_url}${output}`;
}

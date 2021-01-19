// ! /////////
// ! Utils //
// ! /////////
function generate() {
  // * Generate password
  let set = "";
  set += CHOICES.uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  set += CHOICES.lowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
  set += CHOICES.symbols ? `!#$%&*?@^~` : "";
  set += CHOICES.numbers ? "0123456789" : "";

  let password = "";
  for (let i = 0; i < parseInt(passwordSize.value); i++) {
    password += set[Math.floor(Math.random() * set.length)];
  }

  output.innerText = password;
}

function copyClipboard() {
  // * Copy password to the clipboard
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = output.innerText;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

// ! ///////////////////////
// ! Parameter procedures //
// ! ///////////////////////
const passwordSize = document.getElementById("password-size");

const passwordSizeValue = document.getElementById("size-value");
passwordSizeValue.innerText = passwordSize.value;

passwordSize.oninput = function () {
  passwordSizeValue.innerText = this.value;
  generate();
};

let CHOICES = {
  uppercase: true,
  lowercase: true,
  symbols: true,
  numbers: true,
};

for (const choice in CHOICES) {
  document.getElementById(choice).oninput = function () {
    CHOICES.uppercase = this.checked;
    generate();
  };
}

// ! //////////////////
// ! Event listeners //
// ! //////////////////
document.getElementById("bt-copy").addEventListener("click", copyClipboard);
document.getElementById("bt-generate").addEventListener("click", generate);

const output = document.querySelector(".show-password");
generate();

const WA_url = "https://api.whatsapp.com/send";

const URL_ENCODING = {
  " ": "%20",
  "#": "%23",
  "&": "%26",
  "+": "%2B",
  ".": "%2E",
};

// ! ////////
// ! Utils //
// ! ////////
function get_inputs() {
  let phone_number = document.getElementById("phone-number");
  phone_number = phone_number.value.replace(/[^0-9]/g, "");
  let message = document.getElementById("message").value;
  return { phone_number, message };
}

function get_link(phone_number, message) {
  const phone_number_out = `phone=${phone_number}`;
  const message_out = `text=${message}`;
  return `${WA_url}/?${phone_number_out}&${message_out}`;
}

// ! //////////////////
// ! Event functions //
// ! //////////////////
function copyClipboard() {
  const { phone_number, message } = get_inputs();
  const WA_link = get_link(phone_number, message);

  // * Copy text value to the clipboard
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = WA_link;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function openWhatsApp() {
  const { phone_number, message } = get_inputs();
  const WA_link = get_link(phone_number, message);

  window.open(WA_link, "_blank");
}

// ! //////////////////
// ! Event listeners //
// ! //////////////////
document
  .getElementById("copy-clipboard")
  .addEventListener("click", copyClipboard);
document
  .getElementById("open-whatsapp")
  .addEventListener("click", openWhatsApp);

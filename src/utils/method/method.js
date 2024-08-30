import cryptoJs from "crypto-js";

export function setCookie(name, value, days = 7) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const notificationCustome = (api, title, content) => {
  const openNotification = (placement) => {
    api.info({
      message: title,
      description: content,
      placement,
    });
  };
  return openNotification("bottomRight");
};

export const encryptionString = (value, key) => {
  return cryptoJs.AES.encrypt(value, key).toString();
};

export const decodeString = (cookieName, key) => {
  const value = getCookie(cookieName);
  if (value !== null) {
    const bytes = cryptoJs.AES.decrypt(value, key);
    return bytes.toString(cryptoJs.enc.Utf8);
  }
  return "";
};

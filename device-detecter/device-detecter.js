window.onload = () => {
  showDeviceInfo();
};

function showDeviceInfo() {
  document.getElementById('device-info').innerHTML = '';
  const deviceInfo = getDeviceInfo();

  if (deviceInfo) {
    Object.keys(deviceInfo).forEach((key) => {
      const li = document.createElement('li');
      const result = deviceInfo[key] ? 'true' : 'false';
      li.innerHTML = `${key}: <span class="${result}">${result}</span>`;

      document.getElementById('device-info').appendChild(li);
    });
  }
}

function getDeviceInfo() {
  if (!window.navigator || !window.navigator.userAgent) {
    return null;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  return {
    mobile: /(ipod|ipad|iphone|android|mobile)/.test(userAgent) ? true : false,
    ios: /(ipod|ipad|iphone)/.test(userAgent) ? true : false,
    android: /(android)/.test(userAgent) ? true : false,
    chrome: /(chrome)/.test(userAgent) ? true : false,
    safari: /(safari)/.test(userAgent) && !/(chrome)/.test(userAgent) ? true : false,
    firefox: /(firefox)/.test(userAgent) ? true : false,
    ie: /(msie)/.test(userAgent) ? true : false,
    edge: /(edge|trident)/.test(userAgent) ? true : false,
    webView: /(fbav|line|wv|iab|webview)/.test(userAgent) ? true : false,
  };
}
let publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwDd2/XuiMbOn6w5CcAZW
RdyazUF+gxbY0nTmZvJNNxt3nkopD3VEhxdF+XbjnC1l78mGqqitSYtWRNLpnzr9
O6h7Np2jfHtHsCBiWCvvZ/BzxwYL+VOETvJJEXtXbAFMQpSdgcO8yi8rg5U7LjHv
11wRWyivzS/a233ICcnw/OrL9cKGYJUrz+w9ephuSKfAdnRFkES70yXDvJjXRaO0
ioPLKvE3NpDSWZ+u/S+fSB0a40J2Nzwkzmsy8Ynr/hD+1191N0Xe77RzSMSSotxG
EYeJwIuafrzvgUg5SAtILqyxka+WJiJ00YaCuPpdpo//FlO0Vog1zIGFQqURfan+
EwIDAQAB
-----END PUBLIC KEY-----
`;

window.onload = () => {
  document.getElementById('public-key').value = publicKey;
}

function doEncrypt() {
  const pubKey = document.getElementById('public-key').value;
  if (!pubKey) { return; }

  const text = document.getElementById('text').value;
  if (!text) { return; }

  const hash = document.getElementById('hash').value;

  encrypt(text, pubKey, hash)
    .then((encrypted) => {
      document.getElementById('encrypted').value = encrypted;
    })
    .catch((error) => {
      document.getElementById('encrypted').value = error;
    });
}

function encrypt(text, pubKey, hash) {
  return new Promise((resolve, reject) => {
    const encoded = this.strEncoding(text);
    importKey(pubKey, hash).then((cryptoKey) => {
      const crypto = window.crypto || window.msCrypto; // for IE

      if (window.msCrypto) {
        const encryptDataOpt = crypto.subtle.encrypt(
          {
            name: 'RSA-OAEP',
            hash: hash
          },
          cryptoKey,
          encoded
        );
        encryptDataOpt.oncomplete = (e) => {
          const encryptedU8A = new Uint8Array(e.target.result);
          const encrypted = btoa(Uint8Array2String(encryptedU8A));
          resolve(encrypted);
        };

      } else if (window.crypto) {
        crypto.subtle.encrypt(
          {
            name: 'RSA-OAEP',
            hash: { name: hash }
          },
          cryptoKey,
          encoded
        ).then((encryptData) => {
          const encryptedU8A = new Uint8Array(encryptData);
          const encrypted = btoa(Uint8Array2String(encryptedU8A));
          resolve(encrypted);
        });
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

function strEncoding(content) {
  if (window.TextEncoder) {
    return new TextEncoder().encode(content);
  }
  const utf8 = unescape(encodeURIComponent(content));
  const result = new Uint8Array(utf8.length);
  for (let i = 0; i < utf8.length; i++) {
    result[i] = utf8.charCodeAt(i);
  }
  return result;
}

function importKey(pubKey, hash) {
  return new Promise((resolve, reject) => {
    const publicKeyContents = pubKey.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '');
    const binaryDerString = window.atob(publicKeyContents.replace(/\s/g, ''));
    const binaryDer = str2ab(binaryDerString);

    const crypto = window.crypto || window.msCrypto; // for IE
    if (window.msCrypto) {
      const importKeyOpt = crypto.subtle.importKey(
        'spki',
        binaryDer,
        {
          name: 'RSA-OAEP',
          hash: hash
        },
        true,
        ['encrypt']
      );
      importKeyOpt.oncomplete = (e) => {
        resolve(e.target.result);
        return;
      };

    } else if (window.crypto) {
      crypto.subtle.importKey(
        'spki',
        binaryDer,
        {
          name: 'RSA-OAEP',
          hash: hash
        },
        true,
        ['encrypt']
      ).then((cryptoKey) => {
        resolve(cryptoKey);
        return;
      });
    } else {
      reject('Dont has window.crypto or window.msCrypto.');
    }
  })
}

function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function Uint8Array2String(encryptedUint8) {
  let convertStr = '';
  for (let i = 0; i < encryptedUint8.length; i++) {
    convertStr += String.fromCharCode(encryptedUint8[i]);
  }

  return convertStr;
}

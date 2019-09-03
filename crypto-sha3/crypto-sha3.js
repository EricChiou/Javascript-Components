function encrypt() {
  const str = document.getElementById('crypto').value;
  const length = document.getElementById('length').value;

  const result = CryptoJS.SHA3(str, { outputLength: length });
  document.getElementById('result').value = result;
}
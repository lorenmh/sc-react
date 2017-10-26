export function httpGet(path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.addEventListener('load', () => {
      let data = xhr.responseText;
      try {
        data = JSON.parse(data);
      } catch (e) {}

      if (Math.floor(xhr.status / 100) === 2) {
        return resolve({ data });
      }
      reject({ data, status: xhr.status });
    });
    xhr.send();
  });
}

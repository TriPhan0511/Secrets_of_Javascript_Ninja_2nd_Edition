// Defines a report function
function report(message) {
  const listItem = document.createElement('li');
  listItem.textContent = message;
  document.getElementById('results').appendChild(listItem);
}

// Defines a assert function
function assert(value, desc) {
  const listItem = document.createElement('li');
  listItem.textContent = desc;
  value ? (listItem.className = 'pass') : (listItem.className = 'fail');
  document.getElementById('results').appendChild(listItem);
}

// Defines a pass function
function pass(message) {
  const listItem = document.createElement('li');
  listItem.textContent = message;
  listItem.className = 'warning';
  document.getElementById('results').appendChild(listItem);
}

// Defines a fail function
function fail(message) {
  const listItem = document.createElement('li');
  listItem.textContent = message;
  listItem.className = 'fail';
  document.getElementById('results').appendChild(listItem);
}
// -------------------------------------------------------

// Defines a function to get JSON
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function () {
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(`${this.status} ${this.statusText}`);
        }
      } catch (error) {
        reject(error.message);
      }
    };
    request.onerror = function () {
      reject(`${this.status} ${this.statusText}`);
    };
    request.send();
  });
}

function getJSON(url) {
  return new Promise((resolve, reject) => {
    // Creates an XMLHttpRequest object
    const request = new XMLHttpRequest();

    // Initialize the request
    request.open('GET', url);

    // Register an onload handler that will be called if the server has responded
    request.onload = function () {
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(`${this.status} ${this.statusText}`);
        }
      } catch (e) {
        console.log('test');
        reject(e.message);
      }
    };

    // If there's an error while communicating with the server, reject the promise.
    request.onerror = function () {
      reject(`${this.status} ${this.statusText}`);
    };

    // Sends the request
    request.send();
  });
}

// Uses the promise created by the getJSON function to register resolve and reject callbacks
getJSON(
  'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/ninjas.json'
)
  .then((ninjas) => {
    for (let ninja in ninjas) {
      report(`${ninjas[ninja]['name']}: ${ninjas[ninja]['age']}`);
    }
  })
  .catch((e) => {
    fail(`Shouldn't be here: ${e}`);
  });

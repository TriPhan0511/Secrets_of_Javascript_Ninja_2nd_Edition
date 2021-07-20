/** 6.3.4 - Creating our first real-world promise */

/**
 * One of the most common asynchronous actions on the client is fetching data from the
 * server. As such, this is an excellent little case study on the use of promises.
 * For the underlying implementation, we'll use the built-in XMLHttpRequest object.
 */

/** Listing 6.15 - Creating a getJSON promise */

function getJSON(url) {
  // Creates and returns a new promise
  return new Promise((resolve, reject) => {
    // Creates an XMLHttpRequest object
    const request = new XMLHttpRequest();

    // Initialize the request
    request.open('GET', url);

    // Register an onload handler that will be called if the server has responded
    request.onload = function () {
      try {
        // Even if the server has responded, it doesn't mean everything went as expected.
        // Use the result only if the server responds with status 200 (everything OK).
        if (this.status === 200) {
          // Try to parse the JSON string;
          // if it succeeds, resolve the promise as successful with the parsed object
          resolve(JSON.parse(this.response));
        }
        // If the server reponds with a different status code,
        // or if there's an exception parsing the JSON string, reject the promise.
        else {
          reject(`${this.status} ${this.statusText}`);
        }
      } catch (e) {
        console.log('test');
        // reject(e.message);
        reject(e);
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
// getJSON('data/ninjas.json')
getJSON(
  'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/ninjas.json'
)
  .then((ninjas) => {
    assert(ninjas !== null, 'Ninjas obtained');
  })
  .catch((e) => {
    fail(`Shouldn't be here: ${e}`);
  });

/**
 * NOTE:
 * Executing this example, and all subsequent examples that reuse this function,
 * requires a running server. You can, for example,
 * use www.npmjs.com/package/http-server
 */

/**
 * Our goal is to create a getJSON function that returns a promise that will enable us to
 * register success and failure callbacks for asynchronous getting JSON-formatted data from
 * the server. For the underlying implementation, we use the built-in XMLHttpRequest object
 * that offers two events: onload and onerror. The onload event is triggered when the browser
 * receives a response from the server, and onerror is triggered when an error in
 * communication happens. These events handlers will be called asynchronous by the browser,
 * as they occurs.
 *
 * If an error in the communication happens, we definitely won't be able to get our data
 * from the server, so the honest thing to do is to reject our promise:
 * 
      request.onerror = function () {
        reject(`${this.status} ${this.statusText}`);
      };
 * 
 * If we receive a response from the server, we have to analyze that response and consider
 * the exact situation. Without going to much detail, a server can respond with various 
 * things, but in this case, we care only that the reponse is successful (status 200). If
 * it isn't, again we reject the promise.
 * 
 * Even if the server has successfully responded with data, this still doesn't mean that 
 * we're in the clear. Because our goal was to get JSON-formatted objects from the server,
 * the JSON code could always have syntax errors. This is why, when calling the JSON.parse
 * method, we surround the code with a try-catch statement. If an exception occurs while
 * parsing the server response, we also reject the promise. With this, we've taken care of
 * all bad scenarios that can happen.
 * 
 * If everything goes according to plan, and we successfully obtain our objects, we can
 * safely resolve the promise. Finally, we can use our getJSON function to fetch ninjas
 * from the server:
 * 
      getJSON('data/ninjas.json')
      .then((ninjas) => {
        assert(ninjas !== null, 'Ninjas obtained');
      })
      .catch((e) => {
        fail(`Shouldn't be here: ${e}`);
      });
 * 
 * In this case, we have three potetial sources of errors: errors in establishing the communication
 * between the server and the client, the server responding with unanticipated data (invalid response
 * status), and invalid JSON code. But from the perpestive of the code that uses the getJSON function,
 * we don't care about the specifics of error sources. We only supply a callback that gets triggered 
 * if everything goes okay and the data is properly received, and a callback that gets triggered if 
 * any error occurs. This makes our lives as developers so much easier.kz
 * 
 */

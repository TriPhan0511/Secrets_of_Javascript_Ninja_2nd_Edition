// Defines a assert function
function assert(condition, message) {
  const list = document.getElementById('results');
  const listItem = document.createElement('li');
  listItem.textContent = message;
  condition ? (listItem.className = 'pass') : (listItem.className = 'fail');
  list.appendChild(listItem);
}

// Defines a report function
function report(message) {
  const list = document.getElementById('results');
  const listItem = document.createElement('li');
  listItem.textContent = message;
  listItem.className = 'report';
  list.appendChild(listItem);
}

// Defines a fail function
function fail(message) {
  const list = document.getElementById('results');
  const listItem = document.createElement('li');
  listItem.className = 'failed';
  listItem.textContent = message;
  list.appendChild(listItem);
}

// Defines a getJSON function which returns a promise
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
      } catch (err) {
        reject(err.message);
      }
    };

    request.onerror = function () {
      reject(`${this.status} ${this.statusText}`);
    };

    request.send();
  });
}

// Get reference to the directory in which the json files contained
const jsonRepo =
  'http://127.0.0.1:5500/Secrets_of_Javascript_Ninja_2nd_Edition/Part_02_Understanding_functions/Chapter_06_Generators_and_Promises/JSON_files';

// // Chaining promises
// getJSON(`${jsonRepo}/ninjas.json`)
//   .then((ninjas) => getJSON(ninjas[0].missionsUrl))
//   .then((missions) => getJSON(missions[0].detailsUrl))
//   .then((mission) => assert(mission, 'The mission obtained.'))
//   .catch((err) => fail(err));
// -----------------------------------------------------------------

// // Waiting a number of promises: Returns a new Promise, if success, returns an array of values
// Promise.all([
//   getJSON(`${jsonRepo}/ninjas.json`),
//   getJSON(`${jsonRepo}/mapInfo.json`),
//   getJSON(`${jsonRepo}/plan.json`),
// ])
//   .then((results) => {
//     const ninjas = results[0];
//     const mapInfo = results[1];
//     const plan = results[2];

//     assert(ninjas[0].missionsUrl, ninjas[0].missionsUrl);
//     assert(mapInfo.id, mapInfo.id);
//     assert(plan.plan1.name, plan.plan1.name);
//   })
//   .catch((err) => fail(err));
// -----------------------------------------------------------------

// // Promise racing: Returns a new Promise, if success, returns only one value.
// Promise.race([
//   getJSON(`${jsonRepo}/hanzo.json`),
//   getJSON(`${jsonRepo}/hattori.json`),
//   getJSON(`${jsonRepo}/yoshi.json`),
// ])
//   .then((ninja) => assert(ninja, ninja.name))
//   .catch((err) => fail(err));
// -----------------------------------------------------------------

// // Combines generator and promise to write asynchronous code
// async(function* () {
//   try {
//     const ninjas = yield getJSON(`${jsonRepo}/ninjas.json`);
//     const missions = yield getJSON(ninjas[0].missionsUrl);
//     const mission = yield getJSON(missions[0].detailsUrl);

//     assert(mission, 'The mission obtained.');
//   } catch (err) {
//     fail(err);
//   }
// });

// function async(generator) {
//   // Declares an iterator which control the generator
//   const iterator = generator();

//   // Defines a handle function which handles each of return value from the generator
//   function handle(iteratorResult) {
//     if (iteratorResult.done) {
//       return;
//     }
//     const iteratorValue = iteratorResult.value;
//     if (iteratorValue instanceof Promise) {
//       iteratorValue.then((res) => handle(iterator.next(res))).catch((err) => iterator.throw(err));
//     }
//   }

//   // Calls the handle function
//   try {
//     handle(iterator.next());
//   } catch (err) {
//     iterator.throw(err);
//   }
// }
// -----------------------------------------------------------------

// Using async and await to write asynchronous
(async function () {
  const ninjas = await getJSON(`${jsonRepo}/ninjas.json`);
  const missions = await getJSON(ninjas[0].missionsUrl);
  const mission = await getJSON(missions[0].detailsUrl);

  assert(mission, 'The mission obtained');
})();

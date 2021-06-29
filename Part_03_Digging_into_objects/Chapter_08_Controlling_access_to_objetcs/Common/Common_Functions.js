// Defines assert function
function assert(value, desc) {
  const li = document.createElement('li');
  value ? (li.className = 'pass') : (li.className = 'fail');
  li.textContent = desc;
  document.querySelector('#results').appendChild(li);
}

// Defines report function
function report(...arg) {
  let li = document.createElement('li');
  const results = document.querySelector('#results');
  if (arg.length > 0) {
    for (let item of arg) {
      li.className = 'pass';
      li.textContent = String(item);
      results.appendChild(li);
    }
  }
}

// Defines pass function: Display an error when the program throws an exception
function pass(string) {
  const li = document.createElement('li');
  li.textContent = string;
  document.querySelector('#passed').appendChild(li);
}

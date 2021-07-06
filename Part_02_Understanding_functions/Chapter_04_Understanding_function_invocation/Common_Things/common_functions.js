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

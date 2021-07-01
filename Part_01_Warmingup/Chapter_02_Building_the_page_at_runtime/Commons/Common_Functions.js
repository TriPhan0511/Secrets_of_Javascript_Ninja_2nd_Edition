function assert(value, desc) {
  const li = document.createElement('li');
  li.textContent = desc;
  value ? (li.className = 'pass') : (li.className = 'fail');
  document.querySelector('#results').appendChild(li);
}

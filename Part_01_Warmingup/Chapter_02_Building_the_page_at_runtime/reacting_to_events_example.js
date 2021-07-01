/**
 * Now let's look at an example web application with a simple UI that reacts to user actions: Every time a user
 * moves a mouse or clicks the page, a message is displayed.
 */

/**
 * Listing 2.1 - Small web application with a GUI reacting to events
 */

// Defines a function that adds a message to an element
function addMessage(element, message) {
  const messageElement = document.createElement('li');
  messageElement.textContent = message;
  element.appendChild(messageElement);
}

// Calling the addMessage function
const first = document.getElementById('first');
addMessage(first, 'Page loading');

// Attaches a mousemove event handler to body
document.body.addEventListener('mousemove', function () {
  const second = document.getElementById('second');
  addMessage(second, 'Event: mousemove');
});

// Attaches a click event handler to body
// Using arrow function and querySelector
document.body.addEventListener('click', () =>
  addMessage(document.querySelector('#second'), 'Event: click')
);

/**
 * We define an add an addMessage function that, when invoked, creates a list item element, sets its text content,
 * and appends it to an existing element:
 * 
    function addMessage(element, message) {
      const messageElement = document.createElement('li');
      messageElement.textContent = message;
      element.appendChild(messageElement);
    }
 * 
 * We follow this by using the built-in getElementById method to fetch an element wich the ID first from 
 * the document, and adding a message to it that notifies us that the page is loading:
 * 
    const first = document.getElementById('first');
    addMessage(first, 'Page loading');
 * 
 * Finally we attach two event handlers to the body of the web page. 
 * We start with the mousemove event handler, which is executed every time the user moves the mouse, and adds
 * a message "Event: mousemove" to the second list element by calling the addMessage function:
 * 
    document.body.addEventListener('mousemove', function () {
      const second = document.getElementById('second');
      addMessage(second, 'Event: mousemove');
    });
 * 
 * We also register a click event handler, which, whenever the user clicks the page, logs a 
 * message: "Event: click", also to the second list element:  
 * 
    document.body.addEventListener('click', () =>
      addMessage(document.querySelector('#second'), 'Event: click')
    );
 * 
 * 
 */

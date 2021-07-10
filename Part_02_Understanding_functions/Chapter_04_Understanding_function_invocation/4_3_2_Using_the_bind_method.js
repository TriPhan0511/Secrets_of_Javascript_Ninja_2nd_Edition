/** 4.3.2 - Using the bind method */

/**
 * In this chapter, you;ve already met two methods that every function has access to,
 * call and apply, and you've seen how to use them for greater control over the context
 * and arguments of our function invocation.
 *
 * In addition to these methods, every function has access to the bind method that, in
 * short, creates a new function. This function has the same body, but its context is
 * always bound to a certain object, regardless of the way we invoke it.
 *
 * Let's visit our little priblem with button-click handlers one last time:
 */

/** Listing 4.15 - Binding a specific context to an event handler */

/**
    <button id="test">Click me</button>
    <ul id="results"></ul>

    <script>
      let button = {
        clicked: false,
        click: function () {
          this.clicked = true;
          assert(button.clicked, 'The button has been clicked.');
        },
      };

      const elem = document.getElementById('test');
      elem.addEventListener('click', button.click.bind(button));

      let boundFunction = button.click.bind(button);
      assert(boundFunction != button.click, 'Calling bind creates a completely new function');
    </script>
 */

/**
 * The secret sauce added here is the bind() method:
 * 
      elem.addEventListener('click', button.click.bind(button));
 */

/**
 * The bind method is available to all functions, and is designed to create and return a
 * new function that's bound to the passed-in object (in this case, the button object).
 * The value of the this parameter is always set to that object, regardless of the way
 * the bound function was invoke. Apart from that, the bound function behaves like the
 * originating function, because it has the same code in ints body.
 *
 * Whenever the button is clicked, that bound function will be invoked with the button object
 * as its context, because we've used that button object as an argument to the bind.
 * 
 * Note that calling the bind method doesn't modify the original function. It creates 
 * a completely new function, a fact asserted at the end of the example:
 * 
      let boundFunction = button.click.bind(button);
      assert(boundFunction != button.click, 'Calling bind creates a completely new function');
 * 
 * 
 */

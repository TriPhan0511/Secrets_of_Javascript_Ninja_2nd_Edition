/** 4.3 - Fixing the problem of function context */

/**
 * In the preceding section, you saw some of the problems that can happen when dealing with
 * the function context in Javascript. In callback functions (such as event handlers), the
 * function context might not be exactly what we expect, but we can use the call and
 * apply methods to get around it.
 *
 * In this section, you'll see two other options: arrow functions and the bind method,
 * which can, in certain cases, achieve the same effect, but in a much more elegant way.
 */
// ------------------------------------------------------------------------------------------------

/** 4.3.1 - Using arrow functions to get around function context */

/**
 * The arrow functions have one feature that make them particularly good as callback functions:
 * Arrow functions don't have their own this value. Instead, they remember the value of the
 * this parameter at the time of their definition.
 *
 * Let's revisit our problem with button-click callbacks in the following listing:
 */

/** Listing 4.13 - Using arraow function to work around callback function context */

/**
    <button id="test">Click me</button>

    <script>
      function Button() {
        // Defines a property
        this.clicked = false;

        // // Defines a method using function expression (in Listing 4.10)
        // this.click = function () {
        //   this.click = true;
        //   assert(button.clicked, 'The button has been clicked.');
        // };

        // Defines a method using arrow function
        this.click = () => {
          this.clicked = true;
          assert(button, 'The button has been clicked.');
        };

        // NOTE: Arrow functions don't have their own context.
        // Instead, the context is inherited from the function in which they're defined.
        // The this parameter in our arrow function callback refers to the button object.
      }

      // Creates a Button instance
      const button = new Button();

      // Establishes the click handler on the HTML button element
      const elem = document.getElementById('test');
      elem.addEventListener('click', button.click);
    </script>
 */

/**
 * A we already mentioned, arrow function don't get their own implicit this parameter
 * when we call them; instead they remember the value of the this parameter at the time
 * they were created. In our case, the click arrow function was created inside a constructor
 * function, where the this parameter is newly constructed object, so whenever we (or browser)
 * call the click function, the value of the this parameter will always bound to the newly
 * constructed button object.
 */
// ------------------------------------------------------------------------------------------------

/** CAVEAT: ARROW FUNCTIONS ANG OBJECT LITERALS */

/**
 * Because the value of the this parameter is picked up at the moment that the arrow function
 * is created, some seemingly strange behaviors can result. Let's go back to our button-click
 * handler example. Let's say we've come to the conclusion that we don't need a constructor
 * function, because we have only one button. We place it with a simple object literal,
 * in the following way:
 */

/** Listing 4.14 - Arrow function and object literal */

/**
    <button id="test">Click me</button>

    <script>
      // The value of the this parameter in global code is the gloabal window object.
      assert(this === window, 'this === window');

      // The button object is defined as an object literal
      let button = {
        clicked: false,

        // Our arrow function is a property of an object literal
        click: () => {
          this.clicked = true;

          // Tests whether the button was clicked.
          assert(button.clicked, 'The button has been clicked.'); // -> FAILED

          // The value of this in our arrow function is the gloabal window object.
          assert(this === window, 'In arrow function this === window.');

          // clicked is stored on window.
          assert(window.clicked, 'clicked is stored in window.');
        },
      };

      const elem = document.getElementById('test');
      elem.addEventListener('click', button.click);
    </script>
 */

/**
 * Now, we'll again revisit our little rule: Arrow function pick up the value of this parameter
 * at the moment of their creation. Because the click arrow function is created as a property
 * value of an object literal, and the object literal is created in the gloabal code, the this
 * value of the arrow function will be the this value of the global code. And, as we've seen from
 * the first assertion placed in our global code:
 *
    assert(this === window, 'this === window');
 *
 * the value of this parameter in the global code is the global window object. Therefore, our
 * clicked property will be defined on the global window object, and not on our button object.
 * Just to be sure, in the end, we check that the window object has been assigned a clicked
 * property:
 *
    assert(window.clicked, 'clicked is stored in window.');
 *
 * As you can see, failing to keep in mind all the consequences of arrow function can lead to
 * some subtle bugs, so be careful!
 */

/**
 * Now that we've explored how arrow functions can be used to circumvent the problem of function
 * contexts, let's continue with another method for fixing the same problem.
 */

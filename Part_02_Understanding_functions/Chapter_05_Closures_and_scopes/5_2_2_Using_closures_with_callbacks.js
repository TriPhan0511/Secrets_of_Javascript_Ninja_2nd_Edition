/** 5.2.2 - Using closures with callbacks */

/**
 * Another common use of closure occurs when dealing with callbacks - when a function is
 * called at an unspecified later time. Often, within such functions, we frequently need
 * to access outside data.
 *
 * The following list shows an exmaple that creates a simple animation with callback timers.
 */

/** Listing 5.4 - Using a closure in a timer interval callback */

/**
    function animateIt(elementId) {
      let elem = document.getElementById(elementId);
      let tick = 0;
      let timer = setInterval(function () {
        if (tick < 100) {
          elem.style.left = elem.style.top = tick + 'px';
          tick++;
        } else {
          clearInterval(timer);
          assert(tick === 100, 'Tick accessed via a closure');
          assert(elem, 'Element also accessed via a closure');
          assert(timer, 'Timer reference also obtained via a closure.');
        }
      }, 10); 
    }

    // Now that it's all set up, we set it in motion!
    animateIt('box1');
 */

/**
 * What's expecially important about this code is that it uses a single anonymous function,
 * placed as a setInterval argument, to accomplish the animation of the target div element.
 * That function accesses three variables: elem, tick, timer, via a closure, to control the
 * animation process. The three variables (the reference to the DOM element, elem; the tick
 * counter, tick; and the timer reference, timer) all must be maintained across the steps of
 * the animation. And we need to keep them out of the global scope.
 *
 * But the example will still work fine if we move the variables out of the animateIt function
 * and into the global scope. So why all the arm flailing about not polluting the gloabl scope?
 *
 * Go ahead and move the variables into the global scope and verify that example still works.
 * Now modify the example to animate two elements: Add another element with a unique ID, and
 * call the animateIt function with that ID after the original call.
 *
 * The problem immediately becomes obvious. If we keep the variables in the global scope, we
 * need to a set of three variables for each animation. Otherwise, they'll step all over each
 * other, trying to use the same set of variables to keep track of multiple states.
 *
 * By defining the variables inside the function, and by relying on closures to make them
 * available to the timer callback invocations, each animation gets it own private "bubble"
 * of variables.
 *
 * Without closures, doing multiple thing at once, whether event handling, animation, or even
 * server requests, would be increbibly difficult. If you're waiting for a reason to care about
 * closures, this is it!
 *
 * This example is a particularly good one for demonstrating how closures are capable of
 * producing some surprisingly and concise code. Bu including the variables in the animateIt
 * function, we create implied closure without needing any complex syntax.
 * 
 * There's another important concept that this example makes clear. Not only can we see the
 * values that these variables had at the time the closure was created, but we can update them
 * within the closure while the function within the closure executes. The closure isn't a
 * snapshot of the state of the scope at the time of creation, but an active encapsulation of
 * that state that we can modify as long as the closure exists.
 */

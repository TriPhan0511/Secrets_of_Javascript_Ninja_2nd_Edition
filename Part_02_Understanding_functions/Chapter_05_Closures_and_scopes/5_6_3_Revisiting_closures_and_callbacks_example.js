/** 5.6.3 - Revisiting closures and callbacks example */

/**
 * Let's go back to our simple animations example with callback timers. This time,
 * we'll animate two objects, as shown in the following listing.
 */

/** Listing 5.13 - Using a closure in a timer interval callback */

function animateIt(elementId) {
  const elem = document.getElementById(elementId);
  let tick = 1;
  let timer = setInterval(function () {
    if (tick < 100) {
      elem.style.top = elem.style.left = `${tick}px`;
      tick++;
    } else {
      clearInterval(timer);
      assert(tick === 100, 'Tick accessed via a closure.');
      assert(elem, 'Element also accessed via a closure.');
      assert(timer, 'Timer reference also obtained via a closure.');
    }
  }, 10);
}

// Calls the animateIt function
animateIt('box1');
animateIt('box2');

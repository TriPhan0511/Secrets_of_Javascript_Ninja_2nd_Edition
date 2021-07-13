/** 5.4.1 - Code nesting */

/**
 * Lexical environments are heavily based on code nesting, which enables one code structure to be
 * contained within another.
 * Figure 5.8 show various types of code nesting:
 */

/** Figure 5.8 - Types of code nesting */
var ninja = 'Muneyoshi';

// The skulk function is contained within global code.
function skulk() {
  var action = 'skulking';

  // The report function is nested within the skulk function.
  function report() {
    var reportNum = 3;

    // The for loop is nested within the report function.
    for (var i = 0; i < reportNum; i++) {
      console.log(`${ninja} ${action} ${i}`);
    }
  }
  report();
}
skulk();

/**
 * In this example, we can see the following:
 *
 *  _ The for loop is nested within the report function.
 *
 *  _ The report function is nested within the skulk function.
 *
 *  _ The skulk function is nested within global code.
 */

/**
 * In terms of scopes, each of these code structures gets an associated lexical environment
 * every time the code is evaluated. For example, on every invocation of the skulk function,
 * a new function lexical environment is created.
 *
 * In addition, it's important to emphasize that inner code structure has access to the variables
 * defined in the outer structure; for exampe, the for loop can access variables from the
 * report function, and the global code; the report function can access variables from the skulk
 * function and the global code; and the skulk function can access only additional varaibles
 * from the global code.
 *
 * There's nothing special about this way of accessing variables; all of us have probably done it
 * many times. But how does the Javascript engine keep track of all these variables, and what's
 * accessible from where? This is where lexical environment jump in.
 */

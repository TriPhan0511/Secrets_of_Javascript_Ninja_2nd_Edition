/** 5.4.2 - Code nesting and lexical environments */

/**
 * In addition to keeping track of local variables, function declarations, and function parameters,
 * each lexical environment has to keep track of its outer (parent) lexical environment. This is
 * neccessary because we have to able to access variables defined in outer code structures; if an
 * identifier can't be found in the current lexical environment, the outer environment is searched.
 * This stop either the matching variable is found or with a reference error if we've reached the
 * global environment and there's no sign of the searched-for identifier.
 *
 * Figure 5.9 shows an example; you can see how the identifiers intro, action, and ninja are resolved
 * when executing the report function.
 */

/** Figure 5.9 - How Javascript engine resolve the values of variables */

var ninja = 'Muneyoshi';

function skulk() {
  var action = 'Skulking';

  function report() {
    var intro = 'Aha!';
    assert(intro === 'Aha!', 'Local');
    assert(action === 'Skulking', 'Outer');
    assert(ninja === 'Muneyoshi', 'Global');
  }

  report();
}

skulk();

/**
 * In this example, the report function is called by the skulk function, which in turn is called by
 * global code. Each execution context has a lexical environment associated with it that contains
 * the mapping for all identifiers defined directly in that context. For example,
 * the global environment holds the mapping for identifiers ninja and skulk, the skulk environment
 * holds the mapping for identifiers action and report, the report environment holds the mapping
 * for the intro identifier.
 */

/**
 * In a particular execution context, besides accessing identifiers defined directly in the matching
 * lexical environment, our program often access other variables defined in outer environments.
 * For example, in the body of the report function, we access the variable action of the outer
 * skulk function, as well as the global ninja variable. To do this, we have to somehow keep track of
 * these outer environments. Javascript does this by taking the advantage of functions as first-class
 * objects.
 */

/**
 * Whenever a function is created, a reference to the lexical environment in which the function was
 * created is stored in an internal (meaning that you can't access or manipulate it directly) property
 * named [[Environment]]; double brackets is the notation that we'll use to mark these internal
 * properties. In our case, the skulk function will keep a reference to the global enviroment, and
 * the report function will keep a reference to the skulk environment, because these were the
 * environments in which the functions were created.
 */

/**
 * NOTE:
 * This seem might odd at first. Why don't we just traverse the whole stack of execution contexts
 * and search their matching enviroments for identifier mapping? Technically, this would work in
 * our example. But remmeber, a Javascript function can be passed around as any other object, so
 * the position of the function definition and the position from where the function is called
 * generally aren't related (remember closures).
 */

/**
 * Whenever a function is called, a new function execution context is created and pushed onto the 
 * execution context stack. In addition, a new associated lexical environment is created. Now comes
 * the crucial part: For the outer environment of the newly created lexical environment, the Javascript
 * engine puts the environment referenced by called the function's internal [[Environment]] property,
 * the enviroment in which the now-called function was created!
 * 
 * In our case, when the skulk function is called, the outer environment of the newly created skulk
 * environment becomes the global environment (because it's the environment in which the skulk function
 * was created). Similarly, when calling the report function, the outer environment of the newly created
 * report environment is set to the skulk environment.
 * 
 * Now let's take a look at the report function:
 * 
        function report() {
          var intro = 'Aha!';
          assert(intro === 'Aha!', 'Local');
          assert(action === 'Skulking', 'Outer');
          assert(ninja === 'Muneyoshi', 'Global');
        }
 * 
 * When the first assert statement is being evaluated, we have to resolve intro identifier.
 * To do this, the Javascript engine starts by checking the environment of the currently
 * running execution context, the report environment. Because the report environment contains
 * a reference to intro, the identifier is resolved.
 * 
 * Next, the second assert statement has to resolve the action identifier. Again, the environment
 * of the currently running execution context is checked. But the report environment doesn't
 * contain a reference to the action identifier, so the Javascript engine has to check the
 * outer environment of the report environment: the skulk environment. Luckily, 
 * the skulk environment contains a reference to the action identifier, and the identifier is resolved.
 * A similar process is followed when trying to resolve the ninja identifier (a little hint: 
 * the identifier can be found in the global environment).
 */

/**
 * Now that you understand the fundamentals of identifier resolution, let's look at the various ways
 * a varaible can be declared.
 */

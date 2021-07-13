/** 5.5.2 - Variable definition keywords and lexical environment */

/**
 * The three types of variable definitions - var, let, and const - can also be categorized
 * by their relationship with the lexical environment (in other words, by their scope). In
 * that case, we can put var on one side, and let and const on the other.
 */
// -----------------------------------------------------------------------------------------

/** USING THE VAR KEYWORD */

/**
 * When using the var keyword, the variable is defined in the closest function or
 * global lexical environment. (Note that blocks are ignored!). This is a long-standing detail
 * of Javascript that has tripped up many developers coming from other languages.
 *
 * Consider the following list
 */

/** Lising 5.7 - Using the var keyword */

// // Defines a global variable, using var
// var globalNinja = 'Yoshi';

// function reportActivity() {
//   // Defines a function local variable, using var
//   var functionActivity = 'jumping';

//   // Defines two varibales in the for loop, using var: i and forMessage variables
//   for (var i = 1; i < 3; i++) {
//     var forMessage = `${globalNinja} ${functionActivity}`;

//     // Within the for loop, we can access the block variables,
//     // function variables, and global variables - nothing surprising here.
//     assert(forMessage === 'Yoshi jumping', 'Yoshi is jumping within the for block.');
//     assert(i, `Current loop conuter: ${i}`);
//   }

//   // STRANGE:
//   // But the variables of the for loop are also accessible outside the for loop.
//   assert(
//     i === 3 && forMessage === 'Yoshi jumping',
//     'Loop variables accessible outside of the loop.'
//   );
// }

// // Calls the reportActivity function
// reportActivity();

// // Normally, none of the function variables are accessible outside the function
// assert(
//   typeof functionActivity === 'undefined' &&
//     typeof i === 'undefined' &&
//     typeof forMessage === 'undefined',
//   'We cannot see function variables outside of a function.'
// );

/**
 * We start by defining a global variable, globalNinja, which is followed by defining a
 * reportActivity function that loops two times notifies us about the jumping activity of
 * our globalNinja. As you can see, within the body of the for loop, se can normally access
 * both the block variables (i and forMessage), the function variables (functionActivity),
 * and the global variables (globalNinja).
 * 
 * But what's strange with Javascript, and what confuses a lot of developers coming from
 * other languages, is that we can access the variables defined with code blocks even outside
 * those blocks:
 * 
        assert(
          i === 3 && forMessage === 'Yoshi jumping',
          'Loop variables accessible outside of the loop.'
        );
 * 
 * This stems from the fact that variables declared with the keyword var are always registered
 * in the closest function or global lexical environment, without paying any attention to blocks.
 */

/**
 * Here we have three lexical environments:
 *
 *  _ The global environment in which the globalNinja variable is registered
 *    (because this is the closest function of gloabal lexical environment)
 *
 *  _ The reportActivity environment, created on the reportActivity function invocation,
 *    which contains functionActivity, i, and forMessage variables, because they're defined with
 *    the keyword var, and this is their closest function environment.
 *
 *  _ The for block environment, which is empty, because var-defined variables ignore blocks
 *    (even when contained within them)
 */

/**
 * Because this behavior is a bit strange, the ES6 version of Javascript offers two new variable
 * declaration keywords: let and const.
 */
// -----------------------------------------------------------------------------------------

/** USING LET AND CONST TO SPECIFY BLOCK-SCOPED VARIABLES */

/**
 * Unlike var, which defines variable in the closest or global lexical environment,
 * the let and const keywords are more straightforward. They define variables in the
 * closest lexical environment (which can be a block environment, a loop environment,
 * a function environment, or even the global environment). We can use let and const
 * to define blocked-scoped, function-scoped, and global-scoped variables.
 *
 * Let's rewrite our previous example to use const and let.
 */

/** Listing 5.8 - Using const and let keywords */

// Defines a global variable, using const.
// Global const variables are usually written in uppercase.
const GLOBAL_NINJA = 'Yoshi';

function reportActivity() {
  // Defines a function local variable, using const
  const functionActivity = 'jumping';

  // Defines two variables in the for loop, using let: i and forMessage variables
  for (let i = 1; i < 3; i++) {
    let forMessage = `${GLOBAL_NINJA} ${functionActivity}`;

    // Within the for loop, we can access the block variables,
    // function variables, and global variables - nothing surprising here.
    assert(forMessage === 'Yoshi jumping', 'Yoshi is jumping within the for block.');
    assert(i, `Current loop counter: ${i}`);
  }

  // Now, the variables of the for loop aren't accessible outside the for loop
  assert(
    typeof i === 'undefined' && typeof forMessage === 'undefined',
    'Loop variables not accessible  outside the loop.'
  );
}

// Calls the reportActivity function
reportActivity();

// Normally, none of the function variables are accessible outside the function.
assert(
  typeof functionActivity === 'undefined' &&
    typeof i === 'undefined' &&
    typeof forMessage === 'undefined',
  'We cannot see function variables outside of a function.'
);

/**
 * When finishing the execution of the second iteration of the for loop in the
 * reportActivity function. We again have three lexical enviroments:
 * the global environment (for global code outside all functions and blocks),
 * the reportActivity environment bound to the reportActivity function, and
 * the block environment for the for loop body. But because we're using let and
 * const keywords, the variables are defined in closest lexical environment; the
 * GLOBAL_NINJA variable is defined in the global environment, the functionActivity
 * variable in the reportActivity environment, and the i and forMessage variables
 * in the for block environment.
 *
 * Now that const and let have been introduced, scores of new Javascript developers
 * who have recently come from other programming languagues can be at peace. Javascript
 * finally supports the same coping rules as other C-like languages. For this reason,
 * from this point in this book, we almost always use const and let instead of var.
 */

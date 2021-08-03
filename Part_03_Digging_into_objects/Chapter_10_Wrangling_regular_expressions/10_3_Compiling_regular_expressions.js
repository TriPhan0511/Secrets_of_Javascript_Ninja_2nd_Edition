/** 10.3 - Compiling regular expressions */

/**
 * Regular expressions go through multiple phases of processing, and understanding
 * what happens during each phase can help us optimize Javascript code that uses
 * regular expressions. The two main phases are compilation and execution.
 *
 * Compilation occurs when the regular expression is first created.
 * Execution occurs when we use the compiled regular expression to match patterns in a string.
 *
 * During compilation, the expression is parsed by the Javascript engine and converted into
 * its internal representation (whatever that may be). This phase of parsing and conversion
 * must occur everytime a regular expression is created (discounting any internal optimizations
 * performed by the browers).
 *
 * Frequently, browsers are smart enough to determine when idetical regular expressions are
 * being used, and to cache the compilation results for that particular expression. But we
 * can't count on this being the case in all browsers. For complex expressions, in particular,
 * we can begin to get some noticeable speed improvements by predefining (and thus precompiling)
 * our regular expressions for later use.
 */

/**
 * As we learned in our regular expression overview in the previous section, there are two ways
 * of creating a compiled regular expression in Javascript: via a literal and via a constructor.
 *
 * Let's look at an example in the following listing.
 */

/** Listing 10.2 - Two ways to create a compiled regular expression */

// // Creates a regex via i literal
// const re1 = /test/i;

// // Creates a regex via a constructor
// const re2 = new RegExp('test', 'i');

// assert(re1.toString() === '/test/i', 'Verify the content of the expression.');
// assert(re1.test('TesT'), "Yes, it's case-insensetive.");
// assert(re2.test('TesT'), 'This one is too.');
// assert(re1.toString() === re2.toString(), 'The regular expressions are equal.');
// assert(re1 !== re2, 'But they are different objects.');

/**
 * In this example, both regular expressions are in their compiled state after creation.
 * If we were to replace every reference to re1 with the literal /test/i, it's possible
 * that the same regex would be compiled time and time again, so compiling a regex once
 * and storing it in a variable for later reference can be important optimization.
 *
 * Note that each regex has a unique object representation: Every time a regular expression
 * is created (and thus compiled), a new regular expression object is created.
 *
 * This is unlike other primitive types (such as string, number, and so on), because the
 * result will always be unique.
 */

/**
 * Of particular importance is the use of the constructor (new RegExp(...)) to create
 * a regular expression. This technique allows us to build and compile an expression
 * from a string that we can dynamically create at runtime. This can be immensely useful
 * for constructing complex expressions that will be heavily reused.
 */

/** For example, let's say we want to determine which elements within a document
 * have a particular class name, whose value we won't know until runtime. Because
 * elements are capable of having multiple class names associated with them
 * (inconveniently stored in a space-delimited string), thise serves as an interesting
 * example of runtime, regular-expression compilation (see the following listing).
 */

/** Listing 10.3 - Compiling a runtime regular eexpression for later use */

/**
 * 
      <!-- Creates test subjects of various elements with various class names -->
      <div class="samurai ninja"></div>
      <div class="ninja samurai"></div>
      <div></div>
      <span class="samurai ninja ronin"></span>

        <script>
        function findClassInElements(className, type) {
          // Collects elements by type
          const elems = document.getElementsByTagName(type || '*');

          // Compiles a regex using the passed class name
          const regex = new RegExp('(^|\\s)' + className + '(\\s|$)');

          // Stores the results
          const results = [];
          for (let i = 0; i < elems.length; i++) {
            const element = elems[i];
            if (regex.test(element.className)) {
              results.push(element);
            }
          }

          return results;
        }

        assert(
          findClassInElements('ninja', 'div').length === 2,
          'The right amount of div ninjas was found'
        );
        assert(
          findClassInElements('ninja', 'span').length === 1,
          'The right amoutn of span ninjas was found.'
        );
        assert(findClassInElements('ninja').length === 3, 'The right amount of ninjas was found.');
      </script>
 * 
 */

/**
 * To start, we set up a number of test-subject <div> and <span> elements with various combinations
 * of class names. The we define our class-name checking function, which accepts as parameters the
 * class name for which we'll check and the element type to check within.
 */

/**
 * Then we collect all elements of the specified type by using the getElementsByTag built-in
 * method and set up our regular expression:
 * 
          const regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
 * 
 * Note the use of the new RegExp() constructor to compile a regular expression based on class name
 * passed to function. This is an instance where we can't use a regex liieral, as the class name for
 * which we'll search isn't known in advance.
 * 
 * We construct (and hence, compile) this expression once in order to avoid frequent and unnecessary 
 * recompilation. Because the contents of th expression are dynamic (based on the incoming className
 * argument), we can relize major performance saving by handling the expression in this manner.
 */

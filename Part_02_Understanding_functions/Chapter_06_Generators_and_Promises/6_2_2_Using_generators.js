/** 6.2.2 - Using generators */

/**
 * Generating sequences of items is all nice and dandy, but let's get more pratical,
 * starting with a simple case of generating IDs.
 */
// -----------------------------------------------------------------------------------------

/** USING GENERATORS TO GENERATE IDS */

/**
 * When creating certain objects, often we need to assign a unique ID to each object.
 * The easiest way to do this is through a global counter variable, but that's kind
 * of ugly because the variable can be accidently messed up from anywhere in our code.
 * Another option is to use a generator, as shown in the following listing.
 */

/** Listing 6.5 - Using generator for generating IDs */

// // Defines a IdGenerator generator function
// function* IdGenerator() {
//   // A variable that keeps track of IDs.
//   // This variable can't be modified from outside our generator
//   let id = 0;
//   // A loop that generates an infinite sequence of IDs
//   while (true) {
//     yield ++id;
//   }
// }

// // An iterator through which we'll request new IDs from the generator
// const idIterator = IdGenerator();

// // Requests three new IDs
// const ninja1 = { id: idIterator.next().value };
// const ninja2 = { id: idIterator.next().value };
// const ninja3 = { id: idIterator.next().value };

// assert(ninja1.id === 1, 'First ninja has id 1.');
// assert(ninja2.id === 2, 'Second ninja has id 2.');
// assert(ninja3.id === 3, 'Third ninja has id 3.');

/**
 * This example starts with a generator that has one local variable, id, which represents
 * our ID counter. The id variable is local to our generator; there's no fear that someone
 * will accidently modify it from somewhere else in the code. This is followed by an infinite
 * while loop, which at each iteartion yields a new id value ans suspends its execution until
 * a request for another ID comes along:
 * 
    function* IdGenerator() {
      let id = 0;
      while (true) {
        yield ++id;
      }
    }
 */

/**
 * NOTE:
 * Writing infinite loop isn't something that we generally want to do in a standard function.
 * But with generators, everything is fine! Whenever the generator encounters a yield statement,
 * the generator execution is sespended until the next method is called again. So every next call
 * executes only one iteration of our infinite while loop and sends back the next ID value.
 */

/**
 * After defining the generator, we create an iterator object:
 * 
    const idIterator = IdGenerator();
 * 
 * This allows us to control the generator with calls to the idIterator.next() method.
 * This executes the generator until a yield is encountered, returning a new ID value
 * that we can use for our objects:
 * 
    const ninja1 = { id: idIterator.next().value };
 * 
 * See how simple this is? No messy global variables whose value can be accidentally
 * changed. Instead, we use an iterator to request values from a generator. In addition,
 * if later we need another iterator for tracking the IDs of, for example, samurai, we
 * can initialize a new generator for that.
 */
// -----------------------------------------------------------------------------------------

/** USING GENERATORS TO TRAVERSE THE DOM */

/**
 * As you can saw in chapter 2, the layout of a web page is based in the DOM, a tree-like
 * structure of HTML nodes, in which every node, except the root one, has exactly one parent,
 * and can have zero or more children. Because the DOM is such a fundametal structure in web
 * development, a lot of our code is based around traversing it. One relatively easy way to
 * do this is by implementing a recursive function that will be executed for each visited
 * node. See the following code.
 */

/** Listing 6.6 - Recursive DOM traversal */

/**
        <div id="subTree">
          <form>
            <input type="text" />
          </form>
          <p>Paragraph</p>
          <span>Span</span>
        </div>

        <script>
          function traverseDOM(element, callback) {
            // Processes the current node with a callback
            callback(element);
            element = element.firstElementChild;
            // Traverses the DOM of each child element
            while (element) {
              traverseDOM(element, callback);
              element = element.nextElementSibling;
            }
          }

          const subTree = document.getElementById('subTree');
          traverseDOM(subTree, function (element) {
            assert(element !== null, element.nodeName);
          });
        </script>
 */

/**
 * In this example, we use a recursive function to traverse all descendants of the element
 * with the id subTree, in the process logging each type of node that we visit. In this
 * case, the code outputs DIV, FORM, INPUT, P, SPAN.
 *
 * We've been writing such DOM traversal code for a while now, and it has served us
 * perfectly fine. But now that we have generators at our disposal, we can do it differently;
 * see the following code.
 */

/** Listing 6.7 - Iterating over a DOM tree with generators */

/**
          function* DomTraversal(element) {
            yield element;
            element = element.firstElementChild;
            while (element) {
              // Use *yield to transfer iteration control to another instance of the DomTraversal generator
              yield* DomTraversal(element); 
              element = element.nextElementSibling;
            }
          }

          const subTree = document.getElementById('subTree');
          // Iterates over the nodes by using the for-of loop
          for (let element of DomTraversal(subTree)) {
            assert(element !== null, element.nodeName);
          }
 */

/**
 * This listing shows that we can achieve DOM traversals with generators, just as easily as
 * with standard recursion, but with the additional benefit of not having to use the slightly
 * awkward syntax of callbacks. Instead of processing the subtree of each visited node by
 * recursing another level, we create one generator function for each visited node and yield
 * to it. This enables us to write what't conceptually recursive code in iterable fashion.
 * The benefit is that we can consume the generated sequence of nodes with a simple
 * for-of loop without resorting to nasty callbacks.
 * 
 * This example is a particulary good one, because it also shows how to use generators
 * in order to separate the code that's producing values (in this case, HTML nodes) from
 * the code that consuming the sequence of generated values (in that case, the for-of loop
 * that logs the visited nodes), without having to resort to callbacks. In addition, using
 * iterations is, in ceratain cases, much more natural than recursion, so it's always good
 * to have our options open.
 */

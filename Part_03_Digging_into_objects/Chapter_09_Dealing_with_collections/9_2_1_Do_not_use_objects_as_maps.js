/** 9.2.1 - Don't use objects as maps */

/**
 * Imagine that somewhere in our site we need to access the translation for the word constructor,
 * so we extend the dictionary example into the following code.
 */

/**
 * Listing 9.14 - Object have access to properties that weren;t explicitly defined
 */

// const dictionary = {
//   ja: {
//     'Ninjas for hire': 'レンタル用の忍者',
//   },
//   zh: {
//     'Ninjas for hire': '忍者出租',
//   },
//   ko: {
//     'Ninjas for hire': '고용 닌자',
//   },
// };

// assert(
//   dictionary.ja['Ninjas for hire'] === 'レンタル用の忍者',
//   "We know how to say 'Ninjas for hire' in Japanese!"
// );
// assert(typeof dictionary.ja['constructor'] === 'undefined', dictionary.ja['constructor']);

/**
 * We try to access the translation for the word constructor - a word that we foolishly forgot to
 * define in our dictionary. Normally, in such a case, we'd expect the dictionary to return undefined.
 * But that isn't the result.
 *
 * As you can see, by accessing the constructor property, we obtain the following string:
 *
 *    function Object() { [native code] }
 *
 * What's is this? As you learned in the chapter 7, all object have prototypes; even if we define new,
 * empty objects as our maps, they still have access to the properties of the prototype objects.
 * One of those properties is constructor (recall that constructor is the property of the prototype object
 * that points back to the constructor function), and it's the culprit behind the mess we now have on
 * our hands.
 *
 * In addition, with objects, keys can only be string values; if you want to create a mapping for other
 * value, that value will be silently converted into a string without anyone asking you anything!
 * For example, imagine that you want to track some information about HTML nodes, as in the following
 * listing.
 */

/** Listing 9.15 - Mapping values to HTML nodes with objects */
/**
      <div id="firstElement"></div>
      <div id="secondElement"></div>
      <ul id="results"></ul>

      <script>
        // Defines two HTML elements and fetches them by using the built-in document.getElementById method
        const firstElement = document.getElementById('firstElement');
        const secondElement = document.getElementById('secondElement');

        // Defines an object that we'll use as a map to store additional information about our HTML elements
        const map = {};

        // Stores information about the first element,
        // and checks that it was correctly stored.
        map[firstElement] = { data: 'firstElement' };
        assert(map[firstElement].data === 'firstElement', 'The first element is correctly mapped.');

        map[secondElement] = { data: 'secondElement' };
        assert(
          map[secondElement].data === 'secondElement',
          'The second element is correctly mapped.'
        );

        assert(map[firstElement].data !== 'firstElement', 'But now the firstElement is overriden!');
      </script>
 */

/**
 * In listing 9.15, we we create two HTML elements, firstElement and secondElement, which we then fetch
 * from the DOM by using document.getElementById method. 
 * In order to create a mapping that will store additional information about each element, we define a
 * plain old Javascript object:
 * 
        const map = {};
 * 
 * Then we use the HTML element as a key for our mapping object and associate some data with it:
 * 
        map[firstElement] = { data: 'firstElement' };
 * 
 * And we check that we can retrieve that data. Because that works as it should, we repeat the entire
 * process for the second element:
 * 
        map[secondElement] = { data: 'secondElement' };
 * 
 * Again, everything looks hunky dory; we've successfully associated some data with our HTML element.
 * But a problem occurs if we decide to revisit the first element:
 * 
          map[firstElement].data
 * 
 * It would be normal to assume that we'd again obtain the information about the first element, but this
 * isn't the case. Instead, the information about the second element is returned.
 * 
 * This happens because with objects, keys are stored as strings. This means when we try to use any
 * non-string value, such as an HTML element, as a property of an object, that value is silently converted
 * to a string by calling its toString method. Here, this returns the string "[object HTMLDivElement]", 
 * and the information about the first element is stored as the value of 
 * the [object HTMLDivElement] property.
 * 
 * Next, when we try to create a mapping for the second element, a similar thing happens. 
 * The second element, which is also an HTML div element, is also converted to a string,
 * and its additional data is also assigned to the [object HTMLDivElement] property, overriding the value
 * we set for the first element.
 */


/**
 * For these two reasons - properties inherited through prototypes and support for 
 * string-only keys - plain objects generally aren't useful as maps. Due to this limitation,
 * the ECMAScript committee has specified a completely new type: Map
 */
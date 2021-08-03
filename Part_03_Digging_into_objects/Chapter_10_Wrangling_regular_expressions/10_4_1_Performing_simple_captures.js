/** 10.4 - Capturing matching segments */

/**
 * The height of usefulness with respect to regumar expressionsis realized when we capture
 * the results that are found so that we can do something with them. Determining whether
 * a string matches a pattern is an obvious first step and often all we need,
 * but determining what was matched is also useful in many situations.
 */
// ------------------------------------------------------------------------------------------------

/** 10.4.1 - Performing simple captures */

/**
 * Say we want to extract a value that's embedded in a complex string. A good example of
 * such a string is the value of the CSS transform property, through which we can modify
 * the visual position of an HTML element.
 */

/** Listing 10.4 - A simple function for capturing an embedded value */

/**
 * 
        <!-- Defines the test subject -->
        <div id="square" style="transform: translateY(15px)"></div>

        <!-- Javascript -->
        <script>
          function getTranslateY(elem) {
            const transformValue = elem.style.transform;
            if (transformValue) {
              const match = transformValue.match(/translateY\(([^\)]+)\)/); // Extracts the translateY value from the string
              return match ? match[1] : '';
            }

            return '';
          }

          // Tests
          const square = document.getElementById('square');
          assert(getTranslateY(square) === '15px', "We've extracted the translateY value.");
        </script>
 * 
 */

/**
 * We define an element that specifies the style that will translate its position by 15px:
 * 
        transform: translateY(15px)
 * 
 * Unfortunately, the browser doesn't offer an API for easily fetching the amount by which 
 * the element is translated. So we create our function :
 * 
        function getTranslateY(elem) {
          const transformValue = elem.style.transform;
          if (transformValue) {
            const match = transformValue.match(/translateY\(([^\)]+)\)/); // Extracts the translateY value from the string
            return match ? match[1] : '';
          }

          return '';
        }
 * 
 * The transform parsing code may seem confusing at first:
 * 
        const match = transformValue.match(/translateY\(([^\)]+)\)/); // Extracts the translateY value from the string
        return match ? match[1] : '';
 * 
 * But it's not too bad when we break it down. To start, we need to determine whether a 
 * transform property even exists for us to parse. If not, we'll return an empty string.
 * If the transform property is resident, we can get down to the opacity value extraction.
 * The match method of a string returns an array of captured values if a match is found,
 * or null if no match found.
 */

/**
 * The array returned by the match method includes entire match in the first index, and
 * then each subsequent capture following. So the zeroth entry would be the entire
 * matched string of translateY(15px), and the entry at the next position would be 15px.
 */

/** Remember that the captures are defined by parentheses in the regular expression.
 * Thus, when we match the transform value, the value is contained in the [1] position
 * of the array, because the only capture we specified in our regex ứa created by the
 * parentheses that we embeded after the translateY portion of the regex.
 */

/**
 * This example use a local regular expression and the match method. Things change
 * when we use global expressions. Let's see how.
 */

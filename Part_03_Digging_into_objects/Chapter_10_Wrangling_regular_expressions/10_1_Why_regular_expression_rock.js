/** 10.1 - Why regular expressions rock */

/**
 * Let's say we want to validate that a string, perhaps entered into a form by a website
 * user, follows the format for a nine-digit U.S. postal code. We all know that the U.S.
 * Postal Service has little sense of humor and insists that a postal code (also known as a
 * ZIP code) follows this specific format:
 * 
    99999-9999
 * 
 * Each 9 represents a decimal digit, and the format is 5 decimal digits, followed by a hyphen,
 * followed by 4 decimal digits. If you use any other format, your package or letters gets
 * diverted into the black hole of the hand-sorting department, and good luck predicting how 
 * long it will take to emerge again.
 * 
 * Let's create a function that, given a string, verifies that the U.S. Postal Service will
 * stay happy. We could resort to performing a comparison on each character, but we're a ninja
 * and that too inelegant a solution, resulting in a lot of needless repetition. 
 * Rather, consider the following condition.
 * 
 */

/** Listing 10.1 - Testing a specific pattern in a string */

// function isThisAZipCode(candidate) {
//   // Short-circuits obviously bogus candidate
//   if (typeof candidate !== 'string' || candidate.length !== 10) {
//     // Tests
//     console.log('Test');
//     return false;
//   }

//   for (let n = 0; n < candidate.length; n++) {
//     let c = candidate[n];
//     // Performs tests based on character index
//     switch (n) {
//       case 0:
//       case 1:
//       case 2:
//       case 3:
//       case 4:
//       case 6:
//       case 7:
//       case 8:
//       case 9:
//         if (c < '0' || c > '9') {
//           return false;
//         }
//         break;
//       case 5:
//         if (c !== '-') {
//           return false;
//         }
//         break;
//     }
//   }
//   return true; // If all succeeds, we're good!
// }

// // Tests
// assert(isThisAZipCode('99999-9999'), 'Pass');
// assert(!isThisAZipCode('99-99'), 'Fail')

/**
 * Even though, would anyone consider this solution elegant? It's more elegant the the
 * brute-force, noniterative approach, but it still seems like an awful a lot of code
 * for such a sumple check. Now consider this approach:
 */

function isThisAZipCode(candidate) {
  return /^\d{5}-\d{4}$/.test(candidate);
}

// Tests
assert(isThisAZipCode('99999-9999'), 'Pass');
assert(!isThisAZipCode('99999-9'), 'Fail');
assert(!isThisAZipCode('99999_9999'), 'Fail');
assert(!isThisAZipCode('99-9999'), 'Fail');
assert(!isThisAZipCode('abc-9999'), 'Fail');

/**
 * Except for some esoteric syntax in the body of the function, that's lot more succinct and
 * elegant, no? That's the power of regular expression
 */

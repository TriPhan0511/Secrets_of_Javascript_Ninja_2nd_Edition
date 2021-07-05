/** 3.4.1 - Rest parameters */

/**
 * Listing 3.7 - Using rest parameters
 * We'll build a function that multiplies the first argumnent with the largest of the remaining arguments
 */

// //  Solution 1:
// function multiMax(first, ...rest) {
//   const max = rest.reduce((accumulator, current) => Math.max(accumulator, current));
//   return first * max;
// }

// // Solution 2:
// function multiMax(first, ...rest) {
//   const max = rest.reduce((accumulator, current) =>
//     accumulator > current ? accumulator : current
//   );
//   return first * max;
// }

// // Solution 3:
// function multiMax(first, ...rest) {
//   let max = rest[0];
//   for (let item of rest) {
//     if (item > max) {
//       max = item;
//     }
//   }
//   return first * max;
// }

// Solution 4: Using sort function
function multiMax(first, ...rest) {
  const max = rest.sort((v1, v2) => v2 - v1)[0];
  return first * max;
}

// assert(multiMax(3, 1, 2, 3) === 9, '3*3=9 (First arg, by largest)');

/**
 * By prefixing the last-named argument of a function with an ellipsis (...), we turn it into
 * an array called the rest parameters, which contains the remaining passed-in arguments.
 */

/**
 * NOTE: Only the last function parameter can be a rest parameter.
 *        Trying to put the ellipsis in front of any parameter that isn't the last will bring us
 *        only sorrow, in the form of SyntaxError: Rest parameter must be last formal parameter
 *
 */

d;

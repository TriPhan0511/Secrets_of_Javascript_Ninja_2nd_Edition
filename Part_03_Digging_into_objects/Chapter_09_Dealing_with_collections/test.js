

/**
 * In this section, we'll explore some of the most common operations on arrays:
 *
 *  _ Iterating (or traversing) through arrays.
 *
 *  _ Mapping existing array items to create a new array based on them.
 *
 *  _ Testing array items to check whether they satisfy certain conditions.
 *
 *  _ Finding specific array items.
 *
 *  _ Aggregating arrays and computing a single value based on array items
 *    (for example, calculating the sum of an array).
 */

/** We'll start with the basics: array iterations. */

// 1. ITERATING THROUGH ARRAYS

// const ninjas = ['Yoshi', 'Hattori', 'Kuma', 'David', 'Harry'];

// // // Way 1: using a for loop with index
// // for (let i = 0; i < ninjas.length; i++) {
// //   report(ninjas[i]);
// // }
// // ---------------------------------------------------------

// // // Way 2: Using for-of loop
// // for (let ninja of ninjas) {
// //   report(ninja);
// // }
// // ---------------------------------------------------------

// // Way 3: Using the built-in forEach method (perform the specified action for each element on an array)
// ninjas.forEach(report);
// -------------------------------------------------------------------------------------------

// // 2. Mapping exsiting array items to create a new array based on them
// const ninjas = ['Yoshi', 'Kuma', 'Hattori', 'David', 'Harry'];

// // // Way 1: Defines a function
// // function map(array, action) {
// //   const output = [];
// //   for (let item of array) {
// //     output.push(action(item));
// //   }
// //   return output;
// // }

// // const arr = map(ninjas, (name) => `I am ${name}`);
// // arr.forEach(report);
// // // ---------------------------------------------------------

// // Way 2: Using the built-in map method
// const arr = ninjas.map((name) => `I am ${name}`);
// arr.forEach(report);
// -------------------------------------------------------------------------------------------

// 3. Testing array items to check whether they satisfy certain conditions

// const ninjas = ['Yoshi', 'Hattori', 'Kuma', 'David', 'Harry'];

// function check(array, condition) {
//   for (const item of array) {
//     if (!condition(item)) {
//       return false;
//     }
//   }
//   return true;
// }

// assert(
//   check(ninjas, (name) => name.length >= 4),
//   "All of ninjas' name's length are greater or equal 4."
// );

// assert(
//   !check(ninjas, (name) => name.length > 5),
//   "Not all of ninjas' name's length are greater than 5."
// );
// -------------------------------------------------------------------------------------------

// // 4. Finding specific array items

// const ninjas = ['Yoshi', 'Kuma', 'Hattori', 'Harry', 'David'];

// // // Way 1: Defines a function
// // function filter(array, condition) {
// //   const output = [];
// //   for (const item of array) {
// //     if (condition(item)) {
// //       output.push(item);
// //     }
// //   }
// //   return output;
// // }

// // let filterArray = filter(ninjas, (name) => name.length === 4);
// // // filterArray.forEach(report);
// // // // -> Kuma

// // // filterArray = filter(ninjas, (name) => name.length <= 5);
// // // filterArray.forEach(report);
// // // // -> Yoshi
// // // // -> Kuma
// // // // -> Harry
// // // // -> David

// // filterArray = filter(ninjas, (name) => name.startsWith('H'));
// // filterArray.forEach(report);
// // // -> Hattori
// // // -> Harry
// // // ---------------------------------------------------------

// // Way 2: Use the built-in filter method

// let filteredNinjas = ninjas.filter((name) => name.length === 4);
// // filteredNinjas.forEach(report);
// // // -> Kuma

// // filteredNinjas = ninjas.filter((name) => name.length >= 5);
// // filteredNinjas.forEach(report);
// // // -> Yoshi
// // // -> Hattori
// // // -> Harry
// // // -> David

// filteredNinjas = ninjas.filter((name) => name.startsWith('H'));
// filteredNinjas.forEach(report);
// // -> Hattori
// // -> Harry
// -------------------------------------------------------------------------------------------

// 5. Aggregating arrays and computing a single value based on array items.
// (for example, calculating the sum of an array)

// // Way 1: Defines a function
// function reduce(array, action, initialValue) {
//   let output = initialValue;
//   for (const item of array) {
//     output = action(output, item);
//   }
//   return output;
// }

// // Calculating the sum of an array
// // const numbers = [1, 2, 3, 4, 5];
// // assert(reduce(numbers, (x, y) => x + y, 0) === 15, 'The sum is 15.');
// // ---------------------------------------------------------------------

// // // Play a role as the built-in array map method
// // const ninjas = ['Hattori', 'Yoshi', 'Kuma', 'Harry', 'David'];

// // const mappedNinjas = reduce(
// //   ninjas,
// //   (initialValue, currentValue) => initialValue.concat(`I am ${currentValue}`),
// //   []
// // );

// // mappedNinjas.forEach(report);
// // ---------------------------------------------------------------------

// // Play a role as the built-in array filter method

// const ninjas = ['Hattori', 'Yoshi', 'Kuma', 'David', 'Harry'];

// const filteredNinjas = reduce(
//   ninjas,
//   (initialValue, currentValue) => {
//     if (currentValue.length === 4) {
//       return initialValue.concat(currentValue);
//     }
//     return initialValue;
//   },
//   []
// );

// // filteredNinjas.forEach(report);
// // // -> Kuma

// const filteredNinjas2 = reduce(
//   ninjas,
//   (initialValue, currentValue) => {
//     if (currentValue.length >= 5) {
//       return initialValue.concat(currentValue);
//     }
//     return initialValue;
//   },
//   []
// );

// filteredNinjas2.forEach(report);
// // -> Hattori
// // -> Yoshi
// // -> David
// // -> Harry
// ---------------------------------------------------------------------

// // Way 2: Use the built-in array reduce method

// const numbers = [1, 2, 3, 4, 5];

// assert(
//   // numbers.reduce((initialValue, currentValue) => initialValue + currentValue, 0) === 15,
//   numbers.reduce((intialValue, currentValue) => intialValue + currentValue),
//   'The sum is 15.'
// );

// assert(
//   // numbers.reduce((intialValue, currentValue) => intialValue * currentValue, 1) === 120,
//   numbers.reduce((intialValue, currentValue) => intialValue * currentValue) === 120,
//   'The result is 120'
// );

// // Play a roles as the built-in map method
// const ninjas = ['Hattori', 'Kuma', 'Yoshi', 'David', 'Kelly'];

// const mappedNinjas = ninjas.reduce(
//   (initialValue, currentValue) => initialValue.concat(`I am ${currentValue}`),
//   []
// );

// mappedNinjas.forEach(report);
// // -> I am Hattori
// // -> I am Kuma
// // -> I am Yoshi
// // -> I am David
// // -> I am Kelly

// ------------------------------------------------------------------------------------------

// Play a role as filter
const ninjas = ['Hattori', 'Kuma', 'Yoshi', 'David', 'Kelly'];

// const filteredNinjas = ninjas.reduce((initialValue, currentValue) => {
//   if (currentValue.length === 4) {
//     return initialValue.concat(currentValue);
//   }
//   return initialValue;
// }, []);

// filteredNinjas.forEach(report);

const filteredNinjas2 = ninjas.reduce((initialValue, currentValue) => {
  if (currentValue.length >= 5) {
    return initialValue.concat(currentValue);
  }
  return initialValue;
}, []);

filteredNinjas2.forEach(report);

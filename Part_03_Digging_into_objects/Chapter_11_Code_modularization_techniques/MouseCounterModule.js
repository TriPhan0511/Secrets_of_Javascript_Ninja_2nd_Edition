/** CommonJS */
let numClicks = 0;
const handleClick = () => {
  alert(++numClicks);
};

// Modifies the module.exports property to specify the public interface of a module
module.exports = {
  countClicks: () => {
    document.addEventListener('click', handleClick);
  },
};
// -------------------------------------------------------------------------------------------

// // Synchronously requires a jQuery module
// const $ = require('jQuery');
// let numClicks = 0;
// const handleClick = () => {
//   alert(++numClicks);
// };

// // Modifies the module.exports property to specify the public interface of a module
// module.exports = {
//   countClicks: () => {
//     $(document).on('click', handleClick);
//   },
// };
// ---------------------------------------------------------------------------------------

/** ES6 */
// let numClicks = 0;
// const handleClick = () => {
//   alert(++numClicks);
// };

// // Modifies the module.exports property to specify the public interface of a module
// export function countClicks() {
//   document.addEventListener('click', handleClick);
// }
// -------------------------------------------------------------------------------

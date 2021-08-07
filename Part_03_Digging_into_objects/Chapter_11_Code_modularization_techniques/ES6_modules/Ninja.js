// Defines a top-level variable in a module
const ninja = 'Yoshi';

// Defines a variable and a function, and
// exports them from the module with the export keyword.
export const message = 'Hello';
export function sayHiToNinja() {
  return `${message} ${ninja}`; // Accesses an inner module variable from the module's public API
}

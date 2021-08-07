/** Chapter 11 - Code modularization techniques - Exercises */

/**
 * Exercise 1
 *
 * Which mechanism enables private module variables in the module pattern?
 *  a.  Prototypes
 *  b.  Closures
 *  c.  Promises
 *
 * Answer: Option b. Closures
 */
// -----------------------------------------------------------------------------------------------------

/**
 * Exercise 2
 *
 * In the following code that uses ES6 modules, which identifiers can be accessed if the
 * module is imported?
 * 
    const spy = 'Yagyu';
    function command() {
      return general + ' commands you to wage war!';
    }
    export const general = 'Minamoto';    
 *
 * Answer: Option c. general
 */
// -----------------------------------------------------------------------------------------------------

/**
 * Exercise 3
 *
 * In the following code that uses ES6 modules, which identifiers can be accessed
 * when the module is imported?
 * 
    const ninja = 'Yoshi';
    function command() {
      return general + ' commands you to wage war!';
    }
    const general = 'Minamoto';

    export { ninja as spy };    
 *    
 *  a.  spy
 *  b.  command
 *  c.  general
 *  d.  ninja
 *
 *
 * Answer: Option a. spy
 */
// -----------------------------------------------------------------------------------------------------

/**
 * Exercise 4
 *
 * Which of the following imports are allowe?
 *
    // File: personnel.js
    const ninja = 'Yagyu';
    function command() {
      return `${general} commands you to wage war!`;
    }
    const general = 'Minamoto';

    export { ninja as spy };
 * 
 *  a.  import { ninja, spy, general } from './personnel.js';
 *  b.  import * as Personnel from './personnel.js';
 *  c.  import { spy } from './personnel.js';    
 *
 * Answer: Options b and c
 */
// -----------------------------------------------------------------------------------------------------

/**
 * Exercise 5
 *
 * If we have the following module code, which statement will import the Ninja class?
 *
    // Ninja.js
    export default class Ninja {
      skulk() {
        return 'skulking';
      }
    }
 * 
 *  a.  import Ninja from './Ninja.js'
 *  b.  import * as Ninja from './Ninja.js'
 *  c.  import * from './Ninja/js'
 * 
 * Answer: Options a and b
 */

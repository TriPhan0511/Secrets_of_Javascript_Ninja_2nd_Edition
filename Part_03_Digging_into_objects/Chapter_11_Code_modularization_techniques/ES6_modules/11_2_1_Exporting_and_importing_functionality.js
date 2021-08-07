/** 11.2.1 - Exporting and importing functionality */

/**
 * Let's start with a simple example that shows how to export functionality from one module
 * and import it into another.
 */

/** Listing 11.5 - Exporting from a Ninja.js module */

/**
 * 
      // Defines a top-level variable in a module
      const ninja = 'Yoshi';

      // Defines a variable and a function, and
      // exports them from the module with the export keyword.
      export const message = 'Hello';
      export function sayHiToNinja() {
        return `${message} ${ninja}`; // Accesses an inner module variable from the module's public API
      }
 * 
 */

/**
 * We first define a variable, ninja, a module variable that will be accessible only within
 * this module, even though it's placed in top-level code (which would make it a global
 * variable in pre-ES6 code).
 *
 * Next, we define another top-level variable, message, which we make accessible from outside
 * the module by using the new export keyword. Finally, we also create and export the
 * sayHiToNinja function.
 */

/**
 * And that's it! This is the minimum syntax we need to know for definening our own modules.
 * We don't have to use immediate functions or remember any esoreric sysntax in order to
 * export functionality from a module. We write our code as we would write standard Javascript
 * code, with the only difference that we prefix some of the identifiers (such as variables,
 * functions, or classes) with an export keyword.
 */

/**
 * Before learning how to import this exported functionality, we'll take a look at an alternative
 * way to export identifiers: We list everything we want to export at the end of the module, as
 * shown in the following listing.
 */

/** Listing 11.6 - Exporting at the end of module */

/**
 * 
      // Specifies all module identifiers
      const ninja = 'Yoshi';
      const message = 'Hello';
      function sayHiToNinja() {
        return `${message} ${ninja}`;
      }

      // Exports some of the module identifiers
      export { message, sayHiToNinja }; 
 * 
 */

/**
 * This way of exporting module identifiers bears some resemblance to the module pattern,
 * as an immediate function returns an object that represents the public interface of our
 * module, and especially to CommonJS, as we expand the module.exports object with the
 * public module interface.
 */
// -------------------------------------------------------------------------------------------

/**
 * Regardless of how we've exported identifiers of certain module, if we need to import them
 * into another module, we have to use the import keyword, as in the following listing.
 */

/** Listing 11.7 - Importing from the Ninja.js module */

/**
 * 
      // Uses the import keyword to import an identifier binding from a module
      import { message, sayHiToNinja } from './Ninja.js';

      // We can now access the imported variable and call the imported function.
      assert(message === 'Hello', 'We can access the imported variable.');
      assert(sayHiToNinja() === 'Hello Yoshi', 'We can say hi to Yoshi from outside the module.');

      // We can't access not-exported module variables directly.
      assert(typeof ninja === 'undefined', 'But we can not access Yoshi directly.'); 
 * 
 */

/**
 * We use the new import keyword to import a variable, message and a function, sayHiToNinja from
 * the Ninja module :
 * 
        import { message, sayHiToNinja } from './Ninja.js';
 * 
 * By doing this, we've gained access to these two identifiers defined in the Ninja module.
 * Finally, we can test that we can access the message variabl and call the sayHiToNinja
 * function:
 * 
        assert(message === 'Hello', 'We can access the imported variable.');
        assert(sayHiToNinja() === 'Hello Yoshi', 'We can say hi to Yoshi from outside the module.');
 * 
 * What we can't do is access the nonexported and nonimported variables. For example, we can't access
 * the ninja variable because it isn't marked with export:
 * 
        assert(typeof ninja === 'undefined', 'But we can not access Yoshi directly.'); 
 */

/**
 * With nodules, we're finally a bit safer from the misuse of global variables. Everything that we
 * didn't explicitly mark for export stays nicely isolated within a module.
 */
// --------------------------------------------------------------------------------------------------------------------------

/**
 * In this example, we've used a named export, which enables us to export multiple identifiers from
 * a module (as we did with message and sayHiToNinja). Because we can export a large number of
 * identifiers, listing them all in an import statement can be tedious. Therefore, a shorthand notation
 * enables us to bring in all exported identifiers from a module, as shown in the following listing.
 */

/** Listing 11.8 - Importing all named exports from the Ninja.js module */

/**
 * 
      import * as ninjaModule from './Ninja.js';

      assert(ninjaModule.message === 'Hello', 'We can acces the imprted variable.');
      assert(
        ninjaModule.sayHiToNinja() === 'Hello Yoshi',
        'We can say hi to Yoshi from outside the module.'
      );
      assert(typeof ninja === 'undefined', 'But we cannot access Yoshi directly.');        
 * 
 */

/**
 * As listing 11.8 shows, to import all exported identifiers from a module, we use
 * the import * notation in combination with an identifier that we'll use to refer
 * to the whole module (in this case, the ninjaModule identifier). After we've done
 * this, we can access the exported identifiers through the property notation;
 * for exmaple, ninjaModule.message, ninjaModule.sayHiToNinja.
 * Notice that we still can't access top-level variable that weren't exported,
 * as is the case with the ninja variable.
 */
// --------------------------------------------------------------------------------------------------------------------------

/** DEFAULT EXPORT */

/**
 * Often we don't want to export a set of related identifiers from a module, but instead
 * want to represent the whole module through a single export. One fairly common situation
 * in which this occurs is when our modules contain a single class, as in the following
 * listing.
 */

/** Listing 11.9 - A default export from Samurai.js */

/**
 * 
     // Uses the export default keywords to specify the default module binding
     export default class Ninja {
          constructor(name) {
               this.name = name;
          }
     }

     // We can still use named exports along with the default export
     export function compareSamurai(samurai1, samurai2) {
          return samurai1.name === samurai2.name;
     }
 * 
 */

/**
 * Here we've added the default keyword after the export keyword, which specifies the default binding
 * for this module. In this case, the default binding for this module is the class named Samurai.
 * Even though we've specified a default binding, we can still use named exports to export additional
 * identifiers, as we did with compareSamurai function.
 */

/**
 * Now, we can use simplified syntax to import functionalities from Samurai.js, as shown in the
 * following listing.
 */

/** Listing 11.10 - Importing a default export */

/**
 * 
     // When importing a default exportm there's no need for braces,
     // and we can use whatever name we want
     import ImportedSamurai from './Samurai.js';

     // We can still import named exports.
     import { compareSamurais } from './Samurai.js';

     // Creates a copule of samurai, and tests that they exist.
     const samurai1 = new ImportedSamurai('Yoshi');
     const samurai2 = new ImportedSamurai('Hattori');

     assert(samurai1 !== undefined && samurai2 !== undefined, 'We can create a couple of Samurai.');

     // We can also access the named exports
     assert(!compareSamurai(samurai1, samurai2), 'We can compare samurai.');

 * 
 */

/**
 * We start this example with importing a default export. For this, we use a less cluttered
 * import syntax by dropping the braces that are mandatory for importing named exports.
 * Also, notice that we can choose an arbitrary name to refer to the default export; we aren't
 * bound to use the one we used when exporting. In this example, ImportedSamurai refers to the
 * Samurai class defined in the file Ninja.js.
 */

/**
 * We continue the example by importing a named export, as in previous examples,
 * just to illustrate that we can have both a default export and a number of
 * named exports within a single module. Finally, we instantiate a couple of
 * samurai objects and call the compareSamurai function, to confirm that all
 * imports work as they should.
 */

/**
 * In this case, both imports are made from the same file. ES6 offers a shorthand syntax:
 * 
     Import ImportedSamurai, { compareSamurai } from './Samurai.js';
 * 
 * Here we use the comma separator to import both the default and named exports from
 * the Samurai.js file, in a single statement.      
 */
// --------------------------------------------------------------------------------------------------------------------------

/** RENAMING EXPORT AND IMPORTS */

/**
 * If necessary, we can also rename both exports and imports. Let's start with renaming exports,
 * as shown in the following code
 */

// Greetings.js
/**
 * 
     // Defines a function called sayHi
     function sayHi() {
          return 'Hello';
     }

     // Tests taht we can access only the sayHi function,
     // but not the alias!
     assert(
          typeof sayHi === 'function' && typeof sayHello === 'undefined',
          'Within the module we can access only sayHi.'
     );

     // Provides an identifier alias with the as keyword
     export { sayHi as sayHello };

 * 
 */
// ---------------------------------------------------------

// Greetings_Consumer.js
/**
 * 
     // When importing, only the sayHello alias is available
     import { sayHello } from './Greetings.js';

     assert(
          typeof sayHi === 'undefined' && typeof sayHello === 'function',
          'When importing, we can only access the alias.'
     );
 * 
 */

/**
 * In the previous example, we define a function called sayHi, and we test that we can access
 * the function only through the sayHi identifier, and not through the sayHello alias that we
 * provide at the end of the module through the as keyword:
 * 
     export { sayHi as sayHello };
 * 
 * We can perform an export rename only in this export form, and not by prefixing the variable
 * or function declaration with the export keyword.
 * 
 * Then, when we perform an import of the renamed export, we reference the import through the
 * given alias:
 * 
     import { sayHello } from './Greetings.js';
 * 
 * Finally, we test that we have access to the aliased identifier, but not the original one:
 * 
     assert(
          typeof sayHi === 'undefined' && typeof sayHello === 'function',
          'When importing, we can only access the alias.'
     );
 * 
 */
// ------------------------------------------------------------------------------------

/**
 * The situation is similar when renaming imports, as shown in the following code
 */

// Hello.js
/**
     // Export a function with a name greet from the Hello.js module
     export function greet() {
          return 'Hello';
     }
 */
// --------------------------------------------------------------

// Salute.js
/**
     // Exports a function with the same name greet from thw Salute.js
     export function greet() {
     return 'Salute';
     }
 */
//-------------------------------------------------------------------

// Hello_Salute_Consumer.js
/**
     // Uses the as keyword to alias imports,
     // thereby avoiding names clashes.
     import { greet as sayHello } from './Hello.js';
     import { greet as saySalute } from './Salute.js';

     // We can't access the original function name
     assert(typeof greet === 'undefined', 'We cannot access greet.');

     // But we can access the aliases
     assert(
          typeof sayHello === 'function' && typeof saySalute === 'function',
          'We can access the aliased identifiers!'
     );
 */

/**
 * Similar to exporting identifiers, we can also use the as keyword to create aliases
 * when importing identifiers from other modules. This is useful when we need to provide
 * a better name that's more suitable to the current context, or when we want to avoid
 * naming clashes, as is the case in this small exmaple.
 */

/**
 * 7.5 - SUMMARY
 */

/**
 * Javascript objects are simple collections of named properties with values.
 */

/**
 * Javasript uses prototypes.
 */

/**
 * Every object can have a referrence to a prototype, an object to which we delegate the search for a particular
 * property, if the object itself doesn't have the searched-for property. An object's prototype can have its own
 * prototype, and so on, forming a prototype chain.
 * 
 * Example:
 * 
    function Person() {}
    let person = new Person();

    console.log(Object.getPrototypeOf(person) === Person.prototype);
    // true

    console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype);
    // true

 */

/**
 * We can define the prototype of an object by using the Object.definePrototypeOf method.
 */

/**
 * Prototypes are closely linked to the constructor functions. Every function has a prototype property that's
 * set as the prototype of objects that it instantiates.
 */

/**
 * A function's prototype object has a "constructor" property pointing back to the function itself.
 * This property is accessible to all objects instantiated with that function and, with certain limitations,
 * can be used  to find out whether an object was created by an particular function.
 */

/**
 * In Javascript, almost everything can be changed at runtime, including an object's prototypes and
 * function's prototypes!
 */

/**
 * If we want the instances created by a Ninja constructor function to "inherit" (more accureately, have access to)
 * properties accessible to instances created by the Person constructor function, set the prototype of the Ninja
 * constructor to a new instance of the Person class.
 */

/**
 * In Javascript, properties have attributes (configurable, enumerable, writable). These properties can be defined
 * by using the built-in Object.defineProperty method.
 */

/**
 * Javascript ES6 adds support for a "class" keyword that enables us more easily mimic classes.
 * Behind the scenes, prototypes are still in play.
 */

/**
 * The "extends" keyword enables elegant inheritance.
 */

/**
 * 8.2 - Using proxy to control access
 */

/**
 * A proxy is a surrogate through which we can control access to another object. It enables us to define
 * custom actions that will be executed when an oject is being interacted with - for example,
 * when a property value is read or set, or when a method is called.
 * You can think of proxies as almost aa generalization of getters and setters; but with each getter and
 * setter, you control access to only a single object property, whereas proxies enable you to generically
 * handle all interactions with an object, incuding even methods calls.
 *
 * We can use proxies when we'd traditionally use getters and setters, such as for logging, data validation,
 * and computed properties. But proxies are even more powerful. They allow us to easily add profiling and
 * performance measurements to our code, autopopulate object properties in order to avoid pesky null exceptions,
 * and to wrap host objects such as the DOM in order to reduce cross-browser incompatibilities.
 *
 * In Javascript, we can create proxies by using the built-in Proxy constructor. Let's start simple, with a proxy
 * that intercepts all attempts to read and write to properties of an object.
 */

/**
 * Listing 8.7 - Creating proxies with the Proxy constructor
 */

// // Declares an object named emperor which is our target object
// const emperor = { name: 'Komei' };

// // Creates a proxy with the Proxy constructor that takes in the object the proxy wraps
// // and an object with traps that will be called when reading (get) and writing (set) to properties
// const representative = new Proxy(emperor, {
//   get: (target, key) => {
//     report(`Reading ${key} through a proxy.`);
//     return key in target ? target[key] : "Don't bother the emperor!";
//   },
//   set: (target, key, value) => {
//     report(`Writing ${key} through a proxy.`);
//     target[key] = value;
//   },
// });

// // Tests
// // Accesses the name property both through the emperor object and through the proxy object
// assert(emperor.name === 'Komei', "The emperor's name is Komei.");
// assert(representative.name === 'Komei', 'We can get the name property through a proxy.');

// // Accessing a non-existing property directly on the object returns undefined
// assert(emperor.nickname === undefined, "The emperor doesn't have a nickname.");
// // Accessing a property through a proxy detects that the property doesn't exist in our target object,
// // so a warning message is returned
// assert(
//   representative.nickname === "Don't bother the emperor!",
//   'The proxy jumps in when we make inproper requests'
// );

// // Adds property through the proxy.
// // The property is accessible both through the target object and through the proxy
// representative.nickname = 'Tenno';
// assert(emperor.nickname === 'Tenno', 'The emperor now has a nickname.');
// assert(representative.nickname === 'Tenno', 'The nickname is also accessible through the proxy.');

/**
 * We first create our base emperor object that has only a name property. Next, by using the built-in 
 * Proxy constructor, we wrap our emperor object (or target object, as it's commonly called) into a proxy
 * named representative. During proxy construction, as a second argument, we also send an object that 
 * specifies traps, functions that will be called when certain actions are performed on an object:
 * 
      const representative = new Proxy(emperor, {
        get: (target, key) => {
          report(`Reading ${key} through a proxy.`);
          return key in target ? target[key] : "Don't bother the emperor!";
        },
        set: (target, key, value) => {
          report(`Writing ${key} through a proxy.`);
          target[key] = value;
        },
      });
 * 
 * In this case, we've specified two traps: a get trap that will be called whenever we try to READ a value of
 * a property through the proxy, and a set trap that will be called whenever we SET a property throgh the proxy.
 * 
 * The get trap performs the following functionality: If the target object has a property, that property is
 * returned; and if the object doesn't have a property, we return a message warning our user not to bother
 * the emperor with frivolous details.
 * 
      get: (target, key) => {
        report(`Reading ${key} through a proxy.`);
        return key in target ? target[key] : "Don't bother the emperor!";
      },
 * 
 * Next, we test that we can access the name property bot directly through the target emperor object as well as
 * through our proxy object:
 * 
      assert(emperor.name === 'Komei', "The emperor's name is Komei.");
      assert(representative.name === 'Komei', 'We can get the name property through a proxy.');
 * 
 * If we access the name property directly through the emperor object, the value Komei is returned. But if
 * we access the name property through the proxy object, the get trap is implicitly called. 
 * Because the name property is found in the target emperor object, the value Komei is also returned.
 */

/**
 * NOTE: It's important to emphasize that proxy traps are activated in the same way as getters and setters.
 * As soon as we perform an action (for example, accessing a property value on a proxy), the matching trap
 * gets implicitly called, and the Javascript engine goes through a similar process as if we've explicitly
 * invoked a function.
 */

/**
 * On the other hand, if we access a nonexisting nickname property directly on the target emperor object,
 * we'll get, unsurprisingly, an undefined value. But if we try to access it through our proxy object,
 * the get handler will be activated. Because the target emperor object doesn't have a nickname property,
 * the proxy's get trap will return "Don't bother the emperor!" message.
 */

/**
 * We'll continue the example by assigning a new property through our proxy object:
 * representative.nickname = 'Tenno'. Because the assignment is done through a proxy, and not directly,
 * the set trap, which logs a message and assigns a property to our target emperor object, is activated:
 * 
 *      set: (target, key, value) => {
          report(`Writing ${key} through a proxy.`);
          target[key] = value;
        },
 * 
 * Naturally, the newly create property can be accessed through the proxy object and the target object:
 * 
      assert(emperor.nickname === 'Tenno', 'The emperor now has a nickname.');
      assert(representative.nickname === 'Tenno', 'The nickname is also accessible through the proxy.');
 * 
 */

/**
 * This is the gist of how to use proxies: Through the Proxy constructor, we create a proxy object that
 * control access to the target object by activating certain traps, whenever an operation is performed
 * directly on a proxy.
 *
 * In this example, we've used the get and set traps, but many other built-in traps allow us to define
 * handlers for various object actions. For example:
 *
 *    * The apply trap will be activated when calling a function, and the construct trap when using the
 *      new operator.
 *
 *    * The get and set traps will be activated when reading / writing to a property.
 *
 *    * The enumerate trap will be activated for for-in statements.
 *
 *    * getPrototypeOf and setPrototypeOf will be activated for getting and setting the prototype value.
 *
 */

/**
 * Now that we know how proxies work and how to create them, let's explore some of their practical aspects,
 * such as how to use proxies for logging, performance measurement, autopopulating properties, and
 * implementing arrays that can be accessed with negative indexes.
 */

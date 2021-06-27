/**
 * In the previous chapter, you saw that Javascript objects are dynamically collections of properties.
 * We can easily add new properties, change the value of properties, and even completely remove
 * existing properties. In many situations (for example, when validating property values, logging, or
 * displaying data in the UI), we need to be able to monitor exactly what's going on with our objects.
 *
 * So in this chapter, you'll learn techniques for controlling access to and monitoring all of the changes
 * that occur in your objects.
 */

/**
 * We'll start with getters and setters, methods that control access to specific object properties.
 * In this chapter, you'll see some of their built-in language support and how to use them for logging,
 * performing data validation, and defining computed properties.
 */

/**
 * We'll continue with proxies, a completely new type of object introduced in ES6. These objects control
 * access to other objects. You'll learn how they work and how to use them to great effect to
 * easily expand your code with cross-cutting concerns such as performance measurement or logging,
 * and how to avoid null exceptions by autopopulating object properties
 */
// ---------------------------------------------------------------------------------------------------------------

/**
 * 8.1 - Controlling access to properties with getters and setters
 */

/**
 * In Javascript, objects are relatively simple collections of properties. The primary way to keep track of our
 * program state is by modifying those properties. For example, consider the following code:
 */

// function Ninja(level) {
//   this.skillLevel = level;
// }

// const ninja = new Ninja(100);

/**
 * Here we define a Ninja constructor that creates ninja objects with a property skillLevel. Later, if we want
 * to change the value of that property, we can write the following code:
 *    ninja.skillLevel = 20;
 *
 * That's nice and convenient, but what happens in the following cases?
 *
 *    * We want to safeguard against accidental mistakes, such as assigning unanticipated data. For example, we
 *      want to stop ourselves from doing something like assigning a value of a wrong type:
 *      ninja.skillLevel = "high".
 *
 *    * We want to log all changes to the skillLevel property.
 *
 *    * We need to show the value of our skillLevel property somewhere in the UI of our web page. Naturally, we
 *      want to present the last, up-to-date value of the property, but how can we easily do this?
 *
 * We can handle all of these cases elegantly with getters and setters methods.
 */

/**
 * In chapter 5, you saw a glimpse of getters and setters as a means of mimicking private object properties in
 * Javascript through closures. Let's revisit the material you've learned so far, by working with ninja that
 * have a private skillLevel property accessible only through getters setters, as shown in the following listing:
 */

/**
 * Listing 8.1 - Using getters and setters to guard private properties
 */

// function Ninja() {
//   // Defines a private skillLevel variable
//   let skillLevel;

//   // The getter method controls access to our private skillLevel variable
//   // this.getSkillLevel = () => skillLevel;

//   // The setter method controls the value we can assign to skillLevel
//   this.setSkillLevel = (value) => (skillLevel = value);
// }

// // Create a Ninja instance
// const ninja = new Ninja();
// // Sets a new value of skillLevel through the setter method
// ninja.setSkillLevel(100);

// // Retrieves the value of skillLevel with the getter method
// assert(ninja.getSkillLevel() === 100, 'Our ninja is at level 100!');

/**
 * We define a Ninja constructor that creates ninjas with a "private" skillLevel variable accessible only
 * through our getSkillLevel and setSkillLevel methods: The property value can be obtained only through
 * the getSkillLevel method, whereas a new property value can be set only through the setSkillLevel method
 * (remember chapter 5 on closures?)
 */

/**
 * Now if we want to log all read attempts of the skillLevel property, we expand the getSkillLevel methode;
 * and if we want to react to all write attempts, we expand the setSkillLevel method,
 * as in the following snippet:
 */

// function Ninja() {
//   // "Private" variable
//   let skillLevel;

//   // Using getters, we can know whenever code accesses a property
//   this.getSkillLevel = () => {
//     report('Getting skill level value');
//     return skillLevel;
//   };

//   // Using setters, we can know whenever code wants to set a new value to a property
//   this.setSkillLevel = (value) => {
//     report('Modifying skillLevel property from:', skillLevel, 'to:', value);
//     skillLevel = value;
//   };
// }

// // Tests
// const ninja = new Ninja();
// ninja.setSkillLevel(200);
// assert(ninja.getSkillLevel() === 200, 'Our ninja is at level 200.');

// // Calls setSkillLevel method again
// ninja.setSkillLevel(300);
// assert(ninja.getSkillLevel() === 300, 'Our ninja is now at level 300.');

/**
 * This is greate. We can easily react to all interactions with our property by plugging in, for example,
 * logging, data validation, or other side effects such as UI modifications.
 *
 * But on nagging concern might be popping in your mind. The skillLevel property is a value property; it
 * references data (the number 100), and not a function. Unfortunately, in order to take advantage of all
 * the benefits of controlled access, all our interactions with the property have to be made by explictly
 * calling the associated methods, to be honest, slightly awkward.
 *
 * Luckily, Javascript has built-in support for true getters and setters: properties that are accessed
 * as normal data properties (for example, ninja.skillLevel), but that are methods that can compute the value
 * of a requested property, validate the passed-in value, or whatever else we need them to do. Let's take a
 * look at this built-in support.
 */

// ---------------------------------------------------------------------------------------------------------------

/**
 * 8.1.1 -  Defining getters and setters
 */

/**
 * In Javascript, getter and setter methods can be defined in two ways:
 *
 *    * By specifying them within object literals or within ES6 class definitions.
 *    * By using the built-in Object.defineProperty method.
 *
 * Explictly support for getters and setters has existed for quite sometime now, since the days of ES5.
 * As always, let's explore the syntax through an example. In this case, we have an object storing a list
 * of ninjas, and we want to be able to get and set the first ninja in the list.
 */

/**
 * Listing 8.2 - Defining getters and setters in object literals
 */

// // A collection of ninjas
// const ninjaCollection = {
//   ninjas: ['Yoshi', 'Kuma', 'Hattori'],

//   // Defines a getter method for the firstNinja property that
//   // returns the first ninja in our collection and logs a message
//   get firstNinja() {
//     report('Getting firstNinja');
//     return this.ninjas[0];
//   },

//   // Defines a setter method for the firstNinja property that
//   // modifies the first ninja in our collection and logs a message
//   set firstNinja(value) {
//     report('Setting firstNinja');
//     this.ninjas[0] = value;
//   },
// };

// // Accesses the first property as if it were a standard object property
// assert(ninjaCollection.firstNinja === 'Yoshi', 'Yoshi is the first ninja');

// // Modifies the firstNinja property as if it were a standard property
// ninjaCollection.firstNinja = 'Hachi';

// // Tests that the property modification is stored
// assert(
//   ninjaCollection.firstNinja === 'Hachi' && ninjaCollection.ninjas[0] === 'Hachi',
//   'Now Hachi is the first ninja.'
// );

/**
 * This example defines a ninjaCollection object that has a standard property, ninjas, which references
 * an array of ninjas, and a getter and a setter for the property firstNinja.
 *
 * The general syntax for getters and setters :
 * (Prefix the property name with either the get or the set keyword)
 * 
      const obj = {
        // Defines a getter method by PREFIXING the property name with the get keyword.
        // Note: A getter doesn't receive any arguments.
        get name() {
          // ...
        },

        // Defines a setter method by PREFIXING the property name with the set keyword.
        // Note: A setter receives one argument (the right side of an assignment expression).
        set name(value) {
          // ...
        },
      };

      // Implicitly call the getter by reading the property value.
      obj.name;

      // Implicitly call the setter by assigning a value to a property.
      obj.name = 'Yoshi';
 * 
 */

/**
 * An important point to take from all this is that native getters and setters allow us to specify properties
 * that are accessed as STANDARD PROPERTIES, but that that are METHODS whose execution is triggered immidiately
 * when the property is accessed
 */

/**
 * This syntax for defining a getter and setter is straightforward, so it's no wonder that we can use the
 * exact same syntax to define getters and setters in other sitations. The following example uses ES6 classes.
 */

/**
 * Listing 8.3 - Using getters and setters with ES6 classes
 */

// class NinjaCollection {
//   constructor() {
//     this.ninjas = ['Yoshi', 'Kuma', 'Hattori'];
//   }

//   // Defines a getter
//   get firstNinja() {
//     report('Getting the first ninja');
//     return this.ninjas[0];
//   }

//   // Defines a setter
//   set firstNinja(value) {
//     report('Setting the first ninja');
//     this.ninjas[0] = value;
//   }
// }

// // Tests
// const ninjaCollection = new NinjaCollection();
// assert(ninjaCollection.firstNinja === 'Yoshi', 'The first ninja is Yoshi');

// ninjaCollection.firstNinja = 'Peter Pan';

// assert(
//   ninjaCollection.firstNinja === 'Peter Pan' && ninjaCollection.ninjas[0] === 'Peter Pan',
//   'The first ninja is Peter Pan'
// );

/**
 * NOTE: We don't always have to define both a getter and setter for a given property. For example,
 * often we'll want to provide only a getter. If in that case we still attempt to write a value to
 * that property, the exact behavior depends on whether the code is in strict or nonstrict mode.
 * If the code is in nonstrict mode, assigning a value to a property with only a getter achieves nothing;
 * the Javascript engine will sliently ignore our request. If, on the other hand, the code is in
 * strict mode, the Javascript will throw a type error, indicating that we're trying to assign a value
 * to a property that has a getter but not setter.
 */

// // Example:
// 'use strict';

// class NinjaCollection {
//   constructor() {
//     this.ninjas = ['Yoshi', 'Hattori', 'Kuma'];
//   }

//   // Getter
//   get firstNinja() {
//     return this.ninjas[0];
//   }
// }

// const ninjaCollection = new NinjaCollection();
// assert(ninjaCollection.firstNinja === 'Yoshi', 'The first ninja is Yoshi');

// ninjaCollection.firstNinja = 'Karl';

// assert(ninjaCollection.firstNinja === 'Karl', 'The first ninja is now Karl');
// ---------------------------------------------------------------------------------------------------------------

/**
 * Although specifying getters and setters through ES6 class and object literals is easy, you've probably
 * noticed something missing. Traditionally, getters and setters are used to control access
 * to PRIVATE object properties. Unfortunately, as we already know from chapter 5, Javascript doesn't have
 * private object properties. Instead, we can mimic them through closures, by defining variables and specifyng
 * object methods that will close over those variables. Because with object literals and classes our getter and
 * setter aren't created within the same function scope as variables that we could use for private object
 * properties, we can't do this. Luckily, there's an alternative way, through Object.defineProperty method.
 */

/**
 * In chapter 7, you saw that the Object.defineProperty method can be used to define new properties by passing
 * in a property descriptor object. Among other things, the property descriptor can include a get and
 * set property that define the property's getter and setter methods.
 *
 * We'll use this feature to modify listing 8.1 to implement buit-in getters and setters that control access
 * to a "private" object property, as shown in the following listing
 */

/**
 * Listing 8.4 - Defining getters and setters with Object.defineProperty method
 */

// function Ninja() {
//   // Defines a private skillLevel variable
//   let skillLevel;

//   // The getter method controls access to our private skillLevel variable
//   // this.getSkillLevel = () => skillLevel;

//   // The setter method controls the value we can assign to skillLevel
//   this.setSkillLevel = (value) => (skillLevel = value);
// }

// // Create a Ninja instance
// const ninja = new Ninja();
// // Sets a new value of skillLevel through the setter method
// ninja.setSkillLevel(100);

// // Retrieves the value of skillLevel with the getter method
// assert(ninja.getSkillLevel() === 100, 'Our ninja is at level 100!');

// Defines a constructor function
function Ninja() {
  // Defines a "private" variable that will be accessible through function closures
  let _skillLevel = 0;
}

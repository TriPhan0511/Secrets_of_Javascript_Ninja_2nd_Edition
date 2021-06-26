/**
 * 07.1 - With prototypes, objects can access properties of other objects
 */

// // Create three objects, each with its own property
// const yoshi = { skulk: true };
// const hattori = { sneak: true };
// const kuma = { creep: true };

// // yoshi has access to only its own, skulk, property
// assert('skulk' in yoshi, 'Yoshi can skulk');
// assert(!('sneak' in yoshi), 'Yoshi cannot sneak');
// assert(!('creep' in yoshi), 'Yoshi cannot creep');

// // Use the Object.setPrototypeOf() method to set one object as the prototype of another object.
// Object.setPrototypeOf(yoshi, hattori);

// // By setting hattori as yoshi's prototype, yoshi now has access to hattori's properties
// assert('sneak' in yoshi, 'Yoshi can sneak');

// // Currently, hattori can't creep
// assert(!('creep' in hattori), 'Hattori cannot creep');

// // Sets the kuma as a prototype of hattori
// Object.setPrototypeOf(hattori, kuma);

// // Now hattori has access to creep
// assert('creep' in hattori, 'Hattori can now creep');

// // yoshi also has access to creep, through hattori
// assert('creep' in yoshi, 'Yoshi can also creep');

/**
 * It's important to emphasize that every object can have a prototype, and an object's prototype
 * can also have a prototype, and so on, forming a PROTOTYPE CHAIN.
 *
 * The search delegation for a particular property occurs up the whole chain, and it stops only
 * when there are no more prototypes to explore. For example, asking yoshi for the value of the
 * creep property triggers the search for the property first in yoshi. Because the property isn't
 * found, yoshi's prototype, hattori, is searched. Again, hatttori doesn't have a property named
 * creep, so hattori's prototype, kuma, is searched, and the property is finally found.
 */
// -------------------------------------------------------------------------------------------------

// // Prototype chain
// console.log(Object.getPrototypeOf(yoshi) === hattori);
// // true
// console.log(Object.getPrototypeOf(hattori) === kuma);
// // true
// console.log(Object.getPrototypeOf(kuma) === Object.prototype);
// // true
// console.log(Object.getPrototypeOf(Object.prototype) === null);
// // true
// -------------------------------------------------------------------------------------------------

/**
 * 07.2 - Object construction and prototypes
 */

/**
 * Now we have a basic idea of how the search for a particular property occurs through
 * the prototype chain, let's see how prototypes are used when constructing new objects
 * with constructor functions.
 */

/**
 * Like object-oriented languages such as Java and C++, Javascript employs the new operator to
 * instantiate new objects via constructors, but there's no true class definition in Javascript.
 * Instead, the new operator, aplied to a constructor function, triggers the creation of
 * a newly allocated object.
 */

/**
 * Every function has a prototype object that's set as the prototype of the objects created with
 * that function.
 */

/**
 * Listing 7.2 - Creating a new instance with a prototyped method
 */

// Define a function that does nothing and returns nothing
// function Ninja() {}

// Every function has a built-in prototype object, which we can freely modify
// Ninja.prototype.swingSword = function () {
//   return true;
// };

// Calls the function as function
// let ninja1 = Ninja();
// Testing confirms that nothing at all seems to happen
// assert(ninja1 === undefined, 'No instances of Ninja created.');

// Calls the function as a constructor
// let ninja2 = new Ninja();
// Testing confirms that not only is a new object instance created, but it possesses the method
// from the prototype of function
// assert(
//   ninja2 && ninja2.swingSword && ninja2.swingSword(),
//   'Instance exists and method is callable.'
// );

/**
 * When the function is created, it immediately gets a new object assigned to its prototype object,
 * an object that we can EXTEND like any other object.
 */

/**
 * A function, when created, gets a new object that assigned to its prototype property.
 * The prototype object initialy has only one property, constructor, that references back to the function.
 */

// assert(
//   Ninja.prototype.constructor === Ninja,
//   "The function's prototype's constructor property references back to the function."
// );

/**
 * When we use a function as a constructor (for example, by calling new Ninja()), the prototype of the newly
 * constructed object is set to the object referenced by the constructor function's prototype.
 */

// assert(
//   Object.getPrototypeOf(ninja2) === Ninja.prototype,
//   'The prototype of ninja2 is Ninja.prototype'
// );

/**
 * In this example, we've extend the Ninja.prototype with the swingSword method, and when the ninja2 is created,
 * its prototype property is set to Ninja's prototype. Therefore, when we try to access the swingSword property
 * on ninja2, the search for the property is delegated to the Ninja prototype object.
 * Notice that ALL objects created with the Ninja constructor will have access to the swingSword method. Now
 * that's code reuse!
 */

/**
 * The swingSword method is the property of the Ninja's prototype, and not the property of ninja instances.
 * Let's explore this difference instance properties and prototype properties.
 */
// -------------------------------------------------------------------------------------------------

/**
 * 07.2.1 - Instance properties
 */

/**
 * When the function is called as a constructor via the new operator, its context is defined as
 * the new object instance. In addition to exposing properties via the prototype, we can initialize values
 * within the constructor function via the this parameter.
 */

/**
 * Listing 7.3 - Observing the precedence of initialization activities
 */

// function Ninja() {
//   // Creates an instance variable that holds a Boolean value initialized to false
//   this.swung = false;
//   // Creates an instance method that return the inverse of the swung instance variable value
//   this.swingSword = function () {
//     return !this.swung;
//   };
// }

// Defines a prototype method with the same name as the instance method.
// Which will take precedence?
// Ninja.prototype.swingSword = function () {
//   return this.swung;
// };

// Constructs a Ninja instance and asserts that the instance method will overide the prototype method
// of the same name
// let ninja = new Ninja();
// assert(ninja.swingSword(), 'Called the instance method, not the prototype method.');

/**
 * NOTE: This isn't anything we'd advise doing in real-world code; quite the opposite. We're doing it
 * here just to demonstrate the precedence of properties.
 */

/**
 * Within the constructor function, the this keyword refers to the newly created object, so the properties
 * added within the constructor are created directly on the new ninja instance. Later, when we access the
 * property swingSword on ninja, there's no need to traverse the prototype chain; the property created within
 * the constructor is immediately found and returned.
 */

/**
 * Every ninja instances get its own version of the properties that were created within the constructor, while
 * they all have access to the same prototype's properties. This is okay for value properties (for example, swung)
 * that are specific to each object instance. But in certain cases it might be problematic for methods.
 */

/**
 * In this example, we'd have three versions of the swingSword method that all perform the same logic.
 * This isn't a problem if we create a couple of objects, but it's something to pay attention to if we
 * plan to create a large number of objects. Because each method copy behaves the same, creating multiple copies
 * often doesn't make sense, because it only consumes more memory. Sure, in general, the Javascript engine might
 * perform some optimizations, but that's not something to rely on. From that perspective, it makes sense to
 * place object methods only on the function's prototype, because in that way we have a single method shared by
 * all object instances.
 */

/**
 * NOTE: Remember chapter 5 on closures: Methods defined within constructor functions allow us to mimic
 * private object variables. If this is something we need, specifying methods within constructors is
 * the only way to go.
 */
// -------------------------------------------------------------------------------------------------

/**
 * 7.2.2 - Side effects of the dynamic nature of Javascript
 */

/**
 * You've already seen that Javascript is a dynamic language in which properties can be easily added,
 * removed, and modified at will. The same thing for prototypes, both function prototypes and
 * object prototypes.
 */

/**
 * Listing 7.4 - With prototypes, everything can be changed at runtime
 */

// Defines a constructor that creates a Ninja with a single Boolean property
// function Ninja() {
//   this.swung = true;
// }

// Creates an instance of Ninja by calling the construtor function via the "new" operator
// const ninja = new Ninja();

// Adds a method to the prototype after the object has been created
// Ninja.prototype.swingSword = function () {
//   return this.swung;
// };

// Shows that method exists in the object
// assert(ninja.swingSword(), 'Method exists, even out of order.');

// Completely overrides the Ninja's prototype with a new object via the pierce method
// Ninja.prototype = {
//   pierce: function () {
//     return true;
//   },
// };

// Even though we've completely replaced the Ninja constructor's prototype,
// our Ninja can still swing a sword, because it keeps a reference to the old Ninja prototype.
// assert(ninja.swingSword(), 'Our ninja can still swing!');

// Newly created ninjas reference the new prototype, so they can pierce but can't swing.
// const ninja2 = new Ninja();
// assert(ninja2.pierce(), 'Newly created ninjas can pierce');
// assert(!ninja2.swingSword, 'But they cannot swing');
// -------------------------------------------------------------------------------------------------

/**
 * 7.2.3 - Object typing via constructors
 */

/**
 * Although it's great to know how Javascript uses the prototype to find the correct property references,
 * it's also handy to know which function constructed an object instance.
 * As you've seen earlier, the constructor of an object instance is available via the constructor property
 * of the constructor function prototype
 */

// // Constructor
// function Ninja() {}

// // Creates an instance of Ninja
// let ninja = new Ninja();

// // Shows the function constructed of ninja
// assert(
//   Object.getPrototypeOf(ninja).constructor === Ninja,
//   'Ninja constructor function is the function constructed of ninja instance'
// );

/**
 * By using the constructor property, we can access the function that was used to created the object.
 * This information can be used as a form of type checking, as shown in the next listing.
 */

/**
 * Listing 7.5 - Examining the type of an instance and its constructor
 */

// Defines a constructor
// function Ninja() {}
// Creates an instance of Ninja
// const ninja = new Ninja();

// Tests the type of ninja via typeof operator.
// This tells us it's an object, but not much else.
// assert(typeof ninja === 'object', 'The type of the instance is object.');

// Tests the type of ninja via instanceof operator.
// This provides more information - that it was constructed from Ninja
// assert(ninja instanceof Ninja, 'instanceof identifies the constructor');

// Tests the type of ninja via the constructor reference.
// This gives a reference to the constructor function.
// assert(ninja.constructor === Ninja, 'The ninja object was created by the Ninja function.');

/**
 * We can use the constructor property, that we now know accessible to all instances, as a
 * reference to the original function that created it. We can use this to verify the origin
 * of the instance (much as we can with the instanceof operator).
 *
 * Additionally, because this is just a refrerence to the original constructor, we can initiate
 * a new Ninja object using it, as shown in next listing
 */

/**
 * Listing 7.6 - Instantiating an new object using a reference to a constructor
 */

// Defines a constructor
// function Ninja() {}
// Creates an instance of Ninja constructor
// let ninja1 = new Ninja();

// Constructs a second Ninja from the first
// let ninja2 = new ninja1.constructor();

// Proves the new object's Ninja-ness
// assert(ninja2 instanceof Ninja, "It's a Ninja!");

// They aren't the same object, but two distinct instances
// assert(ninja1 !== ninja2, 'But not the same Ninja!');

/**
 * What's especially interesting is that we can do this without even having access to the original function;
 * we can use the reference completely begind the scenes, even if the original constructor is
 * no longer in scope.
 */

/**
 * NOTE: Although the constructor property of an object can be changed, doing so doesn't have any immediate
 * or obvious constructive purpose (though we might be able to think of some malicious ones). The property's
 * reason for being is to indicate from where the object was constructed. If the constructor property is
 * overwritten, the original value is lost.
 */
// -------------------------------------------------------------------------------------------------

/**
 * 7.3 - Achieving inheritance
 */

/**
 * Inheritance is a form of reuse in which new objects have access to properties of existing objects.
 * This help us avoid the need to repeat code and data across our code base.
 *
 * In Javascript, inheritance works slightly differently than in other popular object-oriented languages.
 * Consider the following listing, in which we attempt to achieve inheritance.
 */

/**
 * Listing 7.7 - Trying to achieve inheritance with prototypes
 */

// Defines a dancing Person via a constructor and its prototype
// function Person() {}
// Person.prototype.dance = function () {};

// Defines a Ninja
// function Ninja() {}

// Attempts to make Ninja a dancing Person by copying the dance method from the Person prototype
// Ninja.prototype = { dance: Person.prototype.dance };

// Instantiate an Ninja object
// const ninja = new Ninja();

// assert(ninja instanceof Ninja, 'ninja receives functionality from the Ninja prototype');
// // -> true
// assert(ninja instanceof Person, '... and the Person prototype');
// // -> false
// assert(ninja instanceof Object, '... and the Object prototype');
// // -> true

/**
 * Because the prototype of a function is an object, there are multiple ways of copying functionality
 * (such as properties and methods) to effect inheritance.
 *
 * In this code, we define a Person then a Ninja. And because a Ninja is clearly a person, we want
 * Ninja to inherit the attributes of Person. We attempt to do so by copuing the dance property of
 * the Person prototype's method to a similarly named property in the Ninja proptotype.
 *
 * Running our test reveals that although we have taught the ninja to dance, we failed to make the
 * Ninja a Person. We taught the Ninja to mimic the dance of a person, but that hasn't made the Ninja
 * a Person. That's not inheritance - it's just copying.
 *
 * Apart from the fact that this approach isn't exactly working, we'd also need to copy each property
 * of Person to the Ninja prototype individually. That's no way to do inheritance. Let's keep exploring.
 */

/**
 * What we really want to achieve is a PROTOTYPE CHAIN so that a Ninja can be a Person, and a Person can
 * be a Mammal, and a Mammal can be a Animal, and so on, all the way to Object. The best technique for
 * creating such a prototype chain is to use an instance of an object as the other object's prototype:
 *
 *    SubClass.prototype = new SuperClass();
 *
 * For example:
 *
 *    Ninja.prototype = new Person();
 *
 * This preserves the prototype chain, because the prototype of SubClass instance will be an instance of
 * the SuperClass, which has a prototype with all the properties of SuperClass, and which will in turn
 * have a prototype pointing to an instance of its superclass, and on and on.
 *
 * In the next listing, we change listing 7.7 slightly to use this technique.
 */

/**
 * Listing 7.8 - Achieving inheritance with prototypes
 */

// function Person() {}
// Person.prototype.dance = function () {};

// function Ninja() {}

// // Makes a Ninja a Person by making the Ninja prototype an instance of Person
// Ninja.prototype = new Person();

// const ninja = new Ninja();
// assert(ninja instanceof Ninja, 'ninja receives functionality from Ninja prototype');
// assert(ninja instanceof Person, '... and from Person prototype');
// assert(ninja instanceof Object, '... and from Object prototype');
// assert(typeof ninja.dance === 'function', '... and can dance');

/**
 * The only change to the code is to use an instance of Person as the prototype of Ninja.
 * Running the tests show that we've succeeded.
 */

/**
 * When we try to access the dance method through the ninja object, the Javascript runtime will
 * first check the ninja object itself. Because it doesn't have the dance property, its prototype,
 * the person object, is searched. The person object also doesn't have the dance property, so its
 * prototype is searched, and the property is finally found. This is how to achieve inheritance in
 * Javascript.
 *
 * Here's the important implication: When we perform an instanceof operation, we can determine whether
 * the function inherits the functionality of any object in its prototype chain.
 */

/**
 * NOTE: Another technique that may occurred to you, and that we advise STRONGLY AGAINST, is use to the
 * Person prototype object directly as the Ninja prototype, like this: Ninja.prototype = Person.prototype.
 * Any changes to the Ninja prototype will also change the Person prototype (because they're the same object),
 * and that's bound to have undesirable side effects.
 */

/**
 * An additional happy side effect of doing prototype inheritance in this manner is that all inherited
 * function prototypes will continue live-update. Objects that inherit from the prototype always have access
 * to the current prototype properties.
 */

// Example:
// // Add a new method to Person prototype: sing() method
// Person.prototype.sing = function () {};

// assert(typeof ninja.sing === 'function', 'A ninja can also sing.');
// -------------------------------------------------------------------------------------------------

/**
 * 7.3.1 - The problem of overriding the constructor property
 */

/**
 * By setting the new Person object as a prototype of the Ninja constructor, we've lost our connection
 * to the Ninja constructor that was original kept by the original Ninja prototype. This is a problem,
 * because the constructor property can be used to determine the function with which the object was created.
 * Somebody using our code could make a perfectly reasonable assumption that the following test will pass:
 *
 *    assert(ninja.constructor === Ninja, 'The ninja object was created by the Ninja constructor');
 *
 * But in the current state of the application, this test fails. If we search the ninja object for
 * the constructor property, we won't find it. So we go over to its prototype, which also doesn't
 * have a constructor property, and again, we follow the prototype and end up in the prototype object
 * of Person, which has a constructor property referencing the Person function. In effect, we get the
 * wrong answer: If we ask the ninja object which function has constructed it, we'll get Person as the
 * answer. This can be the source of some serious bugs.
 *
 * It's up to us to fix this situation! But before we can do that, we have to take a detour and see how
 * Javascript enables us to configures properties.
 *
 */

// -----------------------------------------------------------
/**
 * CONFIGURING OBJECT PROPERTIES
 */
// -----------------------------------------------------------
/**

 * In Javascript, every obejct properties is described with a PROPERTY DESCRIPTOR through which we can
 * configure the following keys:
 *
 *    configurable - If set to true, the property's descriptor can be changed and the property can be
 *                    deleted. If set to false, we can do neither of these things.
 *
 *    enumerable - If set to true, the property shows up during a for-in loop over the object's properties.
 *
 *    value - Specifies the value of the property. Defaults to undefined.
 *
 *    writable - If set to true, the property value can be changed by using an assignment.
 *
 *    get - Defines the getter function, which will be called when we access the property. Can't be defined
 *          in conjunction with value and writable.
 *
 *    set - Defines the setter function, which will be called whenever an assignment is made to the property.
 *          Also can't be defined in conjunction with value and writable.
 */

/**
 * Say we create a property through a simple assignment, for example:
 */

// ninja.name = 'Yoshi';

/**
 * This property will be configurable, enumerable, and writable, its value will be set to Yoshi,
 * and functions get and set would be undefined.
 */

/**
 * When we want to fine-tune our property configuration, we can use the
 * built-in Object.defineProperty method, which takes an object on which the property will be defined,
 * the name of the property, and a property descriptor object. As an example, take look at the following code.
 */

/**
 * Listing 7.9 - Configuring properties
 */

// // Creates an empty object; uses assignments to add two properties
// var ninja = {};
// ninja.name = 'Yoshi';
// ninja.weapon = 'kusarigama';

// // The built-in Object.defineProperty method is used to fine-tune the property configuration details.
// Object.defineProperty(ninja, 'sneaky', {
//   configurable: false,
//   enumerable: false,
//   value: true,
//   writable: true,
// });

// assert('sneaky' in ninja, 'We can access the new property');

// // Uses the for-in loop to iterate over ninja's enumerable properties
// for (let prop in ninja) {
//   assert(prop !== undefined, `An enumerated property: ${prop}`);
// }
// // -> An enumerated property: name
// // -> An enumerated property: weapon

/**
 * Properties name and weapon will be visited in for-in loop, whereas our specially added sneaky property won't
 * (even though we can access it normally).
 */

/**
 * By setting enumerable to false, we can be sure that the property won't appear when using the for-in loop.
 * To understand why we'd want to do something like this, let's go back to the original problem
 */

// ------------------------------------------------------------------
/**
 * FINALLY SOLVING THE PROBLEM OF OVERRIDING THE CONSTRUCTOR PROPERTY
 */
// ------------------------------------------------------------------

/**
 * When trying to extend Person with Ninja (or to make Ninja a subclass of Person), we ran into the following
 * problem: When we set a new Person object as a prototype to the Ninja constructor, we lose the original
 * Ninja prototype that keeps our constructor property. We don't want to loose the constructor property,
 * because it's useful for determining the function used to create our object instances and it might be
 * expected by other developers working on our code base.
 *
 * We can solve this problem by using the knowledge that we've just obtained. We'll define
 * a new constructor property on the new Ninja.prototype by using the Object.defineProperty method.
 * See the following list
 */

/**
 * Listing 7.10 - Fixing the constructor property problem
 */

// // Defines Person constructor
// function Person() {}
// // Adds a method to Person's prototype
// Person.prototype.dance = function () {};

// // Defines Ninja constructor
// function Ninja() {}
// // Sets the Ninja's prototype an new instance of Person
// Ninja.prototype = new Person();

// // Define a new non-enumerable constructor property poiting back to Ninja
// Object.defineProperty(Ninja.prototype, 'constructor', {
//   enumerable: false,
//   value: Ninja,
//   writable: true,
// });

// // Create a Ninja instance
// var ninja = new Ninja();

// // We've reestablished the connection
// assert(
//   ninja.constructor === Ninja,
//   'Connection from ninja instances to Ninja constructor reestablised!'
// );

// // We haven't added any enumearble properties to the Ninja.prototype
// for (let prop in ninja) {
//   assert(prop === 'dance', 'The only enumerable property is dance');
// }

/**
 * Now if we run the code, we'll see that everything is peachy. We've reestablished the connection between
 * ninja instances and the Ninja function, so we can know that they were constructed by the Ninja function.
 * In addition, if anybody tries to loop through the properties of the Ninja.prototype object, we've made sure
 * that our patched-on property constructor won't be visited. Now that's the mark of a true ninja; we went in,
 * did our job, and got out, without anybody noticing anything from the outside!
 */

// ---------------------------------------------
/**
 * SUMMARY
 */

// // Defines Person constructor function: SuoerClass
// function Person() {}
// // Adds a method to Person.prototype
// Person.prototype.dance = function () {};

// // Defines Ninja constructor function: SubClass
// function Ninja() {}

// // To achieve inheritance, set Ninja's prototype an new object instance of Person and
// // redefine Ninja's prototype's constructor property using Object.defineProperty
// Ninja.prototype = new Person();
// Object.defineProperty(Ninja.prototype, 'constructor', {
//   enumerable: false,
//   value: Ninja,
//   writable: true,
// });

// // Creates Ninja object instance
// const ninja = new Ninja();

// // Tests the inheritance
// assert(ninja instanceof Ninja, 'ninja receives functionalities from Ninja prototype');
// assert(ninja instanceof Person, 'ninja also receives functionalities from Person prototype');
// assert(
//   ninja instanceof Object,
//   'and of course, ninja receives functionalities from Object prototype'
// );

// // Adds a new method to Person.prototype
// Person.prototype.hide = function () {};
// // Testing
// assert(
//   typeof ninja.hide === 'function',
//   'ninja can receive the newly added method on Person prototype.'
// );

// // Tests the Ninja.prototype.constructor property
// assert(
//   ninja.constructor === Ninja,
//   'After redefining constructor property on Ninja prototype, the constructor points back to the Ninja function.'
// );
// // ---------------------------------------------
// -------------------------------------------------------------------------------------------------

/**
 * 7.3.2 - The instanceof operator
 */

/**
 * In most programming languages, the straightforward approach for checking whether an object is a part of
 * a class hierarchy is to use the instanceof operator. For example, in Java, the instanceof operator works
 * by checking whether the object on the left side is either the same class or a subclass of the class type
 * on the right.
 *
 * Although certain parellels could be made with how the instanceof operator works in Javascript, there's a
 * little twist. In Javascript, the instanceof operator works on the prototype chain of the object.
 * For example, say we have the following expression:
 *
 *    ninja instanceof Ninja
 *
 * The instanceof operator works by checking whether the CURRENT prototype of the Ninja function is in
 * the prototype chain of the ninja instance. Let's go back to our persons and ninjas, for more concret example
 */

// function Person() {}
// function Ninja() {}
// Ninja.prototype = new Person();
// const ninja = new Ninja();

// // A ninja instance is both a Ninja and a Person
// assert(ninja instanceof Ninja, 'Our ninja is a Ninja!');
// assert(ninja instanceof Person, 'A ninja is also a Person.');

/**
 * Although the instanceof operator is most common use is in providing a clear way to determine whther
 * an instance was created by a particular function constructor, it doesn't work like that. Instead, it
 * checks whether the prototype of the right-side function is in the prototype chain of the object
 * on the left. Therefore, there is a caveat that we should careful about.
 */
// -------------------------------------------------------------------------------------------------

/**
 * THE INSTANCEOF CAVEAT
 */

/**
 * As you've seen multiple times throughout this chapter, Javascript is a dynamic language in which
 * we can modify a lot of things during program execution. For example, there's nothing stopping us
 * from chaging the prototype of a constructor, as shown in the following listing.
 */

/**
 * Listing 7.12 - Watch out for changes to constructor prototypes
 */

// function Ninja() {}

// const ninja = new Ninja();

// assert(ninja instanceof Ninja, 'Our ninja is a Ninja!');

// // Changes the prototype of the Ninja constructor function
// Ninja.prototype = {};

// // Even though our ninja instance was created by the Ninja constructor,
// // the instanceof operator says that ninja isn't instanceof Ninja anymore!
// assert(!(ninja instanceof Ninja), 'The ninja is now not a Ninja!?');

// // // If we want, we can reset the prototype for ninja
// // Object.setPrototypeOf(ninja, Ninja.prototype);
// // // Testing
// // assert(ninja instanceof Ninja, 'Our ninja is a Ninja, again!');

/**
 * In this example, we again repeat all the basic steps of making a ninja instance, and our first step goes fine.
 * But if we change the prototype of the Ninja constructor function AFTER the creation of the ninja instance, and
 * again test whether ninja is an instanceof Ninja, we'll see that the situation has changed. This will surprise
 * us only if we only cling to the inaccurate assumption that the instanceof operator tells us whether an
 * instance was created by a particular function constructor. If, on the other hand, we take the real semantic
 * of the instanceof operator - that it checks only whether the prototype of the function on the right side
 * is in the prototype chain of the object in the left side - we won't be surprised.
 */
// -------------------------------------------------------------------------------------------------

/**
 * 7.4 - Using Javascript "classes" in ES6
 */

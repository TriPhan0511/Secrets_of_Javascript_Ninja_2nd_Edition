/** 7.3.2 - The instanceof operator */

/**
 * In most programming languages, the straightforward approach for checking whether
 * an object is a part of a class hierarchy is to use the instanceof operator.
 * For example, in Java, the instanceof operator works by checking whether the object
 * on the left side is either the same class or a subclass of the clas type on the right.
 * 
 * Although certain parallels could be made with how the instanceof operator works in
 * Javascript, there's a little twist. In Javascript, the instanceof operator works on
 * the prototype chain of the object. For example, say we have the following expression:
 * 
      ninja instanceof Ninja
 * 
 * The instanceof operator works by checking whether the current prototype of the
 * Ninja function is in the prototype chain of ninja instance.
 * 
 * Let's go back to our persons and ninjas, for a more concrete example.
 */

// function Person() {}
// function Ninja() {}
// Ninja.prototype = new Person();
// Object.defineProperty(Ninja.prototype, 'constructor', {
//   value: Ninja,
//   enumerable: false,
//   writable: true,
// });
// const ninja = new Ninja();

// // A ninja instance is both a Ninja and a Person.
// assert(ninja instanceof Ninja, 'Our ninja is a Ninja.');
// assert(ninja instanceof Person, 'A Ninja is also a Person.');

/**
 * The prototype chain of a ninja instance is composed of a new Person() object, through
 * which we've achieved inheritance, and the Person prototype. When evaluating the
 * expression ninja instanceof Ninja, the Javascript engine takes the prototype of the
 * Ninja function, the new Person() object, and checks whether it's in the prototype chain
 * of the ninja instance. Because the new Person() object is a direct prototype of the ninja
 * instance, the result is true.
 *
 * In the second case, where we check ninja instanceof Person, the Javascript engine takes
 * the prototype of the Person function, the Person prototype, and checks whether it can be
 * found in the prototype chain of the ninja instance. Again, it can, because it's the
 * prototype of our new Person() object, which, as we've already seen, is the prototype of
 * the ninja instance.
 */

/**
 * And that's all there is to know about the instanceof operator. Although its most common
 * use is in providing a clear way to determine whether an instance was created by a particular
 * constructor function, it doesn't exactly work like that. Instead, it checks whether the
 * prototype of the right-side function is in the prototype chain of the object on the left.
 * Therefore, there is a caveat that we should be careful about.
 */

/** THE INSTANCEOF CAVEAT */

/**
 * As you've seen mutiple times throughout this chapter, Javascript is a dynamic language
 * in which we can modify a lot of things during program execution. For example, there's
 * nothing stop us from changing the prototype of a constructor, as shown in the following
 * listing.
 */

/** Listing 7.12 - Watch out for changes to constructor prototype */

function Ninja() {}

const ninja = new Ninja();

assert(ninja instanceof Ninja, 'our ninja is a Ninja!');

// We change the prototype of the Ninja constructor function
Ninja.prototype = {};

// Even though our ninja instance was created by the Ninja constructor,
// the instanceof operator now says that ninja isn't an instance of Ninja anymore!
assert(!(ninja instanceof Ninja), 'The ninja is now not a Ninja!?');

/**
 * In this example, we again repeat all the basic steps of making a ninja instance, and
 * our first test goes fine. But if we change the prototype of the Ninja constructor
 * function after the creation of the ninja instance, and again test whether ninja is
 * an instanceof Ninja, we'll see that the situation has changed. This will surprise us
 * only if we cling to the inaccurate assumption that the instanceof tells us whether
 * an instance was created by a particular constructor function. If, on the other hand,
 * we take the real semantics of the instanceof operator - that it checks only whether
 * the protottype of the function on the right side is in the prototype chain of the
 * object on the left side - we won't be surprised.
 */

/**
 * Now that we understand how prototypes work in Javascript, and how to use prototypes
 * in conjunction with constructor function to implement inheritance, let's move on to
 * a new addition to the ES6 version of Javascript: classes.
 */

/** 6.2.1 - Controlling the generator through iterator object */

/**
 * Making a call to a generator doesn't mean that the body of the generator function will
 * be executed. Instead, an iterator object is created , an object through which we can
 * communicate with the generator. For example, we can use the iterator to request additinal
 * values. Let's adjust our previous example to explore how the iterator object works.
 */

/** Listing 6.2 - Controlling a generator through an iterator object */

// // Defines a generator that will produce a sequence of two weapons
// function* WeaponGenerator() {
//   yield 'Katana';
//   yield 'Wakizashi';
// }

// // Calling a generator creates an iterator through which we control the generator's execution.
// const weaponsIterator = WeaponGenerator();

// // Calling the iterator's next method request a new value from the generator
// const result1 = weaponsIterator.next();
// // The result1 is an object with a returned value and an indicator that tell us
// // whether the generator has more values.
// assert(
//   typeof result1 === 'object' && result1.value === 'Katana' && !result1.done,
//   'Katana received!'
// );

// // Calling next again gets another value from the generator.
// const result2 = weaponsIterator.next();
// assert(
//   typeof result2 === 'object' && result2.value === 'Wakizashi' && !result2.done,
//   'Wakizashi received.'
// );

// // When ther's no more code to execute, the generator returns "undefined" and
// // indicates that it's done.
// const result3 = weaponsIterator.next();
// assert(
//   typeof result3 === 'object' && result3.value === undefined && result3.done,
//   'There are no more results!'
// );

/**
 * As you can see, when we call a generator, a new iterator is created: 
 * 
    const weaponsIterator = WeaponGenerator();
 * 
 * The iterator is used to control the execution of the generator. One of the fundamental 
 * things that the iterator object exposes is the next method, which we can use to control
 * the generator by requesting a value from it:
 * 
    const result1 = weaponsIterator.next();  
 * 
 * As a response to that call, the generator executes its code until it reaches a yield keyword
 * that produces an intermediary result (one item in the generated sequence of items), and returns
 * a new object that encapsulates that result and tells us whether its work is done.
 */

/**
 * As soon as the current value is produced, the generator suspends its execution without
 * blocking and patiently waits for another value request. This is an incredibly powerful
 * feature that standard functions don't have, a feature that we'll use later to great effect.
 * 
 * In this case, the first call to the interator's next method executes the generator code
 * to the first yield expression, yield "Katana", and returns an object with the property
 * value set to Katana and the property done set to false, signaling that there are more 
 * values to produce.
 * 
 * Later, we request another value from the generator, by making another call to the
 * weaponIterator's next method:
 * 
    const result2 = weaponsIterator.next();
 * 
 * This wakes up the generator from suspension, and the generator continues where it 
 * left off, executing its code until another intermediary value is reached: 
 * yield "Wakizashi". This suspends the generator and produces an object carrying Wakizashi.
 * 
 * Finally, when we call the next method the third time, the generator resumes its execution.
 * But this time there's no more code to execute, so the the genrator returns an object with
 * value set to undefined, and done set to true, signaling that it's done with its work.
 * 
 * Now that you've seen how to control generators through iterators, you're ready to learn
 * how to iterate over the produced values.
 */

// // Defines a generator function
// function* WeaponGenerator() {
//   yield 'Katana';
//   yield 'Wakizashi';
// }

// // Defines a iterator object from calling the WeaponGenerator function
// const weaponsIterator = WeaponGenerator();

// let weapon = weaponsIterator.next();
// while (!weapon.done) {
//   assert(weapon.value !== undefined, weapon.value);
//   weapon = weaponsIterator.next();
// }
// -------------------------------------------------------------------------------------------------

/** ITERATING THE ITERATOR */

/**
 * The iterator, created by calling a generator, exposes a next method through which we
 * can request a new value from the generator. The next method returns an object that
 * carries the value produced by the generator, as well as the information stored in the
 * done property that tell us whether the generator has additional values to produce.
 *
 * Now we'll take advantage of these facts to use a plain old while loop to iterate over
 * values produced by a generator. See the following listing
 */

/** Listing 6.3 - Iterating over generator results with a while loop */

// // Defines a generator function
// function* WeaponGenerator() {
//   yield 'Katana';
//   yield 'Wakazashi';
// }

// // Creates a iterator object by calling a generator function
// const weaponsIterator = WeaponGenerator();

// // Creates a variable in which we'll store items of the generated sequence.
// let item;
// // On each loop iteration, fetches one value from the generator and outputs its value.
// // Stops iterating when the generator has no more values to produce.
// while (!(item = weaponsIterator.next()).done) {
//   assert(item.value !== null, item.value);
// }

// -> Katana
// -> Wakazashi

/**
 * Here we again create an iterator object by calling a generator function:
 * 
    const weaponsIterator = WeaponGenerator();
 * 
 * We also creates an item variable in which we'll store individual values produced by the
 * generator. We continue by specifying a while loop with a slightly complicated looping 
 * condition, which we'll break down a bit:
 * 
    while (!(item = weaponsIterator.next()).done) {
      assert(item.value !== null, item.value);
    }
 * 
 * On each loop iteration, we fetch a value from the generator by calling the next
 * method of our weaponsIterator, and we store it in the item value. Like all such
 * objects, the object referenced by the item variable has a value property that
 * store the value returned from the generator, and a done property that signals
 * whether the generator is finished producing values. If the generator isn't done 
 * with its work, we go into another iteration of the loop; and if it is, we stop 
 * looping.
 * 
 * And that's how the for-of loop, from our first example, works. The for-of loop
 * is syntactic sugar for iterating over iterators:
 */

// for (let item of WeaponGenerator()) {
//   assert(item !== null, item);
// }

/**
 * Instead of manually calling the next method of the matching iterator and always
 * checking whether we're finished, we can use the for-of loop to do the exact same
 * thing, only behind the scenes.
 */
// -------------------------------------------------------------------------------------------------

/** YIELDING TO ANOTHER GENERATOR */

/**
 * Just as we often call one standard function from another standard function, in certain
 * cases we want to able to delegate the execution of one generator to another. Let's take
 * a look at an example that generates both warriors and ninjas.
 */

/** Listing 6.4 - Using yield* to delegate to another generator  */

function* WarriorGenerator() {
  yield 'Sun Tzu';
  yield* NinjaGenerator(); // yield* delegate to another generator
  yield 'Genghis Khan';
}

function* NinjaGenerator() {
  yield 'Hattori';
  yield 'Yoshi';
}

for (let warrior of WarriorGenerator()) {
  assert(warrior !== null, warrior);
}

// -> Sun Tzu
// -> Hattori
// -> Yoshi
// -> Genghis Khan

/**
 * If you run this code, you'll see that the output is Sun Tzu, Hattori, Yoshi, Genghis Khan.
 * Generating Sun Tzu probably doesn't catch you off guard; it's the first value yielded by
 * the WarriorGenerator. But the second output, Hattori, deserves an explanation.
 *
 * By using the yield* on an iterator, we yield to another generator. In this example,
 * from a WarriorGenerator we're yielding a new NinjaGenrator; all calls to the current
 * WarriorGenerator iterator's next method are rerouted to the NinjaGenerator. This holds 
 * until the NinjaGenerator has no work left to do. So in our example, after Sun Tzu, the
 * program generates Hattori and Yoshi. Only when the NinjaGenerator is done with its work
 * will the execution of the original iterator continua by outputting Genghis Khan. Notice
 * that this is happening transparently to the code that calls the original generator. The
 * for-of loop doesn't care that the WarriorGenerator yields to another generator; it keeps
 * calling the next until it's done.
 */

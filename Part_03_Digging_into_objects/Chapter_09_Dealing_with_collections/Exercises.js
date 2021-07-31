/** Chapter 09 - Exercises */

/**
 * Exercise 1:
 *
 * What will be the content of the samurai array, after running the following code?
 *
      const samurai = ['Oda', 'Tomoe'];
      samurai[3] = 'Hattori';
 * 
 * Answer: samurai -> ['Oda', 'Tomoe', undefined, 'Hattori']
 */

// const samurai = ['Oda', 'Tomoe'];
// samurai[3] = 'Hattori';

// // Tests
// assert(
//   samurai.length === 4 &&
//     samurai[0] === 'Oda' &&
//     samurai[1] === 'Tomoe' &&
//     samurai[2] === undefined &&
//     samurai[3] === 'Hattori',
//   'There are four items in the samurai array: Oda, Tomoe, undfined, and Hattori.'
// );
// -----------------------------------------------------------------------------------------------------------

/**
 * Exercise 2:
 *
 * What will be the content of the ninjas array, after running the following code?
 *
      const ninjas = [];
      ninjas.push('Yoshi');
      ninjas.unshift('Hattori');
      ninjas.length = 3;
      ninjas.pop();
 *
 * Answer: ninjas -> ['Hattori','Yoshi']
 */

// const ninjas = [];
// ninjas.push('Yoshi');
// ninjas.unshift('Hattori');
// ninjas.length = 3;
// ninjas.pop();

// // Tests
// assert(
//   ninjas.length === 2 && ninjas[0] === 'Hattori' && ninjas[1] === 'Yoshi',
//   'Eventually, there are two ninjas in the ninjas array, they are Hattori and Yoshi.'
// );
// -----------------------------------------------------------------------------------------------------------

/**
 * Exercise 3:
 *
 * What will be the content of the samurai array, after running the following code?
 *
      const samurai = [];
      samurai.push('Oda');
      samurai.unshift('Tomoe');
      samurai.splice(1, 0, 'Hattori', 'Takeda');
      samurai.pop();
 * 
 * Answer: samurai -> ['Oda'] -> ['Tomoe', 'Oda'] -> ['Tomoe', 'Hattori', 'Takeda', 'Oda'] -> ['Tomoe', 'Hattori', 'Takeda']
 *
 */

// const samurai = [];
// samurai.push('Oda');
// samurai.unshift('Tomoe');
// samurai.splice(1, 0, 'Hattori', 'Takeda');
// samurai.pop();

// // Tests
// assert(
//   samurai.length === 3 &&
//     samurai[0] === 'Tomoe' &&
//     samurai[1] === 'Hattori' &&
//     samurai[2] === 'Takeda',
//   'There are three samurai: Tomoe, Hattori, Takeda.'
// );
// -----------------------------------------------------------------------------------------------------------

/**
 * Exercise 4
 *
 * What will be stored in variables first, second, and third, after running the following code?
 *
      const ninjas = [
      { name: 'Yoshi', age: 18 },
      { name: 'Hattori', age: 19 },
      { name: 'Yagyu', age: 20 },
    ];

    const first = ninjas.map((ninja) => ninja.age);
    const second = first.filter((age) => age % 2 === 0);
    const third = first.reduce((aggregate, item) => aggregate + item, 0);
 * 
 * Answer:
 * first -> [18, 19, 20]
 * second -> [18, 20]
 * third -> 38
 * 
 */

// const ninjas = [
//   { name: 'Yoshi', age: 18 },
//   { name: 'Hattori', age: 19 },
//   { name: 'Yagyu', age: 20 },
// ];

// const first = ninjas.map((ninja) => ninja.age);
// const second = first.filter((age) => age % 2 === 0);
// const third = first.reduce((aggregate, item) => aggregate + item, 0);

// // Tests
// assert(
//   first.length === 3 && first[0] === 18 && first[1] === 19 && first[2] === 20,
//   'There are three items in the first variable: 18, 19, 20.'
// );
// assert(
//   (second.length === 2) & (second[0] === 18) && second[1] === 20,
//   'There are two items in the second variable: 18 and 20.'
// );
// assert(third === 57, 'The third variable contains number 57.');
// -----------------------------------------------------------------------------------------------------------

/**
 * Exercise 5
 *
 * What will be stored in variables first and second variables, after running the following code?
 *
      const ninjas = [
        { name: 'Yoshi', age: 18 },
        { name: 'Hattori', age: 19 },
        { name: 'Yagyu', age: 20 },
      ];

      const first = ninjas.some((ninja) => ninja.age % 2 === 0);
      const second = ninjas.every((ninja) => ninja.age % 2 === 0);
 * 
 * Answer:
 * first -> true
 * second -> false
 *
 */

// const ninjas = [
//   { name: 'Yoshi', age: 18 },
//   { name: 'Hattori', age: 19 },
//   { name: 'Yagyu', age: 20 },
// ];

// const first = ninjas.some((ninja) => ninja.age % 2 === 0);
// const second = ninjas.every((ninja) => ninja.age % 2 === 0);

// // Tests
// assert(first, 'Some ages divided by 2.');
// assert(!second, 'Not every age divided by 2.');
// -----------------------------------------------------------------------------------------------------------

/**
 * Exercise 6
 *
 * Which of the following assertion will pass?
 * 
      
      const samuraiClanMap = new Map();

      const ninja1 = { name: 'Toyotomi' };
      const ninja2 = { name: 'Takeda' };
      const ninja3 = { name: 'Akiyama' };

      const oda = { clan: 'Oda' };
      const tokugawa = { clan: 'Tokugawa' };
      const takeda = { clan: 'Takeda' };

      samuraiClanMap.set(ninja1, oda);
      samuraiClanMap.set(ninja2, tokugawa);
      samuraiClanMap.set(ninja2, takeda);

      assert(samuraiClanMap.size === 3, 'There are three mappings.'); // FAIL
      assert(samuraiClanMap.has(ninja1), 'The first samurai has a mapping'); // PASS
      assert(samuraiClanMap.has(ninja3), 'The third samurai has a mapping'); // FAIL
 *
 * Answer: There is only on assertion will be pass: The second assertion:
 * assert(samuraiClanMap.has(ninja1), 'The first samurai has a mapping'); // PASS
 *
 */

// const samuraiClanMap = new Map();

// const ninja1 = { name: 'Toyotomi' };
// const ninja2 = { name: 'Takeda' };
// const ninja3 = { name: 'Akiyama' };

// const oda = { clan: 'Oda' };
// const tokugawa = { clan: 'Tokugawa' };
// const takeda = { clan: 'Takeda' };

// samuraiClanMap.set(ninja1, oda);
// samuraiClanMap.set(ninja2, tokugawa);
// samuraiClanMap.set(ninja2, takeda);

// assert(samuraiClanMap.size === 3, 'There are three mappings.'); // FAIL
// assert(samuraiClanMap.has(ninja1), 'The first samurai has a mapping'); // PASS
// assert(samuraiClanMap.has(ninja3), 'The third samurai has a mapping'); // FAIL
// -----------------------------------------------------------------------------------------------------------

/**
 * Exercise 7
 *
 * Which of the following assertions will pass?
 * 
      const samurai = new Set(['Toyotomi', 'Takeda', 'Akiyama', 'Akiyama']);
      assert(samurai.size === 4, 'There are four samurai in the set.'); // FAIL

      samurai.add('Akiyama');
      assert(samurai.size === 5, 'There are five samurai in the set.'); // FAIL

      assert(samurai.has('Toyotomi'), 'Toyotomi is in!'); // PASS
      assert(samurai.has('Hattori'), 'Hattori is in!'); // FAIL
 *
 * Answer:
 * Only one assertion will pass: The third assertion:
 * assert(samurai.has('Toyotomi'), 'Toyotomi is in!'); // PASS
 *
 */

const samurai = new Set(['Toyotomi', 'Takeda', 'Akiyama', 'Akiyama']);
assert(samurai.size === 4, 'There are four samurai in the set.'); // FAIL

samurai.add('Akiyama');
assert(samurai.size === 5, 'There are five samurai in the set.'); // FAIL

assert(samurai.has('Toyotomi'), 'Toyotomi is in!'); // PASS
assert(samurai.has('Hattori'), 'Hattori is in!'); // FAIL

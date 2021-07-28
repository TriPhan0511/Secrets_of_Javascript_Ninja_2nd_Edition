/** Chapter 08 | Exercises */

/**
 * Exercise 1
 * After running the following code, which of the following expressions will throw
 * an exception and why?
 * 
 *    const ninja = {
        get name() {
          return 'Akiyama';
        },
      };
 *
 *    a. ninja.name(); // TypeError: ninja.name is not a function
 *    b. const name = ninja.name;
 *
 * Answer: Option a will throw an exception because we can only access the name
 * as a property of the ninja object.
 */

// const ninja = {
//   get name() {
//     return 'Akiyama';
//   },
// };

// // ninja.name(); // TypeError: ninja.name is not a function

// const name = ninja.name;
// assert(name === 'Akiyama', 'Our ninja is Akiyama.');
// -------------------------------------------------------------------------------------

/**
 * Exercise 2
 * In the following code, which mechanism allows getters to access the private object
 * variable?
 *
 * Answer: The closure mechanism allows getters to access the private variable.
 * Because the "private" _weapon variable and getter function in the same scope.
 */

// function Samurai() {
//   let _weapon = 'Katana';

//   Object.defineProperty(this, 'weapon', {
//     get: () => _weapon,
//   });
// }

// const samurai = new Samurai();
// assert(samurai.weapon === 'Katana', 'A samurai wielding katana.');
// -------------------------------------------------------------------------------------

/**
 * Exercise 3
 * Which of the following assertion will pass?
 *
 * Answer: The following assertion will pass:
 * _  assert(daimyo.clan ==='Takasu', 'Matsu of clan Takasu');
 * _  assert(proxy.clan === 'Tokugawa', 'Matsu of clan Tokugawa?');
 * _  assert(proxy.clan === 'Tokugawa', 'Matsu of clan Tokugawa?');
 *
 * (Only one assertion will fail: the second assert(daimyo.clan === 'Takasu', 'Matsu of clan Takasu');)
 */

// const daimyo = { name: 'Matsu', clan: 'Takasu' };

// const proxy = new Proxy(daimyo, {
//   get: (target, key) => {
//     if (key === 'clan') {
//       return 'Tokugawa';
//     }
//   },
// });

// assert(daimyo.clan === 'Takasu', 'Matsu of clan Takasu'); // PASS
// assert(proxy.clan === 'Tokugawa', 'Matsu of clan Tokugawa?'); // PASS

// proxy.clan = 'Tokugawa';

// assert(daimyo.clan === 'Takasu', 'Matsu of clan Takasu'); // FAIL
// assert(proxy.clan === 'Tokugawa', 'Matsu of clan Tokugawa?'); // PASS
// -------------------------------------------------------------------------------------

/**
 * Exercise 4
 * Which of the following assertions will pass?
 *
 * Answer:
 * Only the following assertion will fail:
 * The third assertion:
 * proxy.armySize = 'large';
  assert(daimyo.armySize === 'large', 'Matsu has a large army.'); // FAIL? 
 */

const daimyo = { name: 'Matsu', clan: 'Takasu', armySize: 10000 };
const proxy = new Proxy(daimyo, {
  set: (target, key, value) => {
    if (key === 'armySize') {
      const number = Number.parseInt(value);
      if (!Number.isNaN(number)) {
        target[key] = number;
      }
    } else {
      target[key] = value;
    }
  },
});

assert(daimyo.armySize === 10000, 'Matsu has 10 000 men at arms.'); // PASS
assert(proxy.armySize === 10000, 'Matsu has 10 000 men at arms.'); // PASS

proxy.armySize = 'large';
assert(daimyo.armySize === 'large', 'Matsu has a large army.'); // FAIL?

daimyo.armySize = 'large';
assert(daimyo.armySize === 'large', 'Matsu has a large army.'); // PASS

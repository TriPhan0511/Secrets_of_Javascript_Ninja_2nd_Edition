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
 */

// class Ninja {
//   constructor(name) {
//     this.name = name;

//     // Update
//     let _levelSkill;
//     Object.defineProperty(this, 'levelSkill', {
//       get: () => _levelSkill,
//       set: (value) => (_levelSkill = value),
//     });
//   }

//   sayHello() {
//     console.log('Hello');
//   }
// }

// const ninja = new Ninja('Yoshi');

// // console.log(Object.getOwnPropertyNames(ninja));
// // // ["name"]
// // console.log(Object.getOwnPropertyNames(Ninja.prototype));
// // // ["constructor", "sayHello"]

// // Update
// console.log(Object.getOwnPropertyNames(ninja));
// // ["name", "levelSkill"]
// console.log(Object.getOwnPropertyNames(Ninja.prototype));
// // ["constructor", "sayHello"]

function Ninja(){
  this.name
}
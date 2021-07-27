/** 8.1 - Controlling access to properties with getters and setters */

/**
 * In Javascript, objects are relatively simple collections of properties. The primary way
 * to keep track of our program state is by modifying those properties. For example, consider
 * the following code:
 * 
      function Ninja(skillLevel) {
        this.skillLevel = skillLevel;
      }

      const ninja = new Ninja(100);
 * 
 * Here we define a Ninja constructor that creates ninja objects with a property skillLevel.
 * Later, if we want to change the value of that property, we can write the following code:
 * 
      ninja.skillLevel = 20;
 * 
 * That's all nice and convenient, but what happens in the following cases?
 * 
 * _  We cant to safeguard against accidental mistakes, such as assigning unanticipated data.
 *    For example, we want to stop ourselves from doing something like assigning a value of
 *    a wrong type: skill.skillLevel = 'high'.
 * 
 * _  We want to log all changes to the skillLevel property.
 * 
 * _  We need to show the value of our skillLevel property somewhere in the UI of our 
 *    web page. Naturally, we want to present the last, up-to-date value of the property,
 *    but how can we easily do this?
 * 
 * We can handle all of those cases elegantly with getters and setters methods.
 */

/**
 * In the chapter 5, you saw a glimpse of getters and setters as a mean of mimicking private
 * object properties in Javascript through closures.
 *
 * Let's revisit the material you've learned so far, by working with with ninjas that have
 * a private skillLevel accessible only through getteers and setters, as shown in the
 * following listing
 */

/** Listing 8.1 - Using getters and setters to guard private properties */

// function Ninja() {
//   // Defines a private skillLevel variable
//   let skillLevel;

//   // The getter method constrols access to our private skillLevel variable
//   this.getSkillLevel = () => skillLevel;

//   // The setter method controls the values we can assign to skillLevel
//   this.setSkillLevel = (value) => (skillLevel = value);
// }

// // Creates a Ninja instance
// const ninja = new Ninja();

// // Sets a new value of skillLevel through the setter method
// ninja.setSkillLevel(10);
// // Retrieves the value of skillLevel with the getter method
// assert(ninja.getSkillLevel() === 10, 'Now, the skill level is 10.');

/**
 * We define a Ninja constructor that creates ninja with a "private" skillLevel variable
 * accessible only through our getSkillLevel and setSkillLevel methods: The property value
 * can be obtained only through the getSkillLvel method, whereas a new property value can
 * be set only the setSkillLevel method (remember chapter 5 on closures?)
 */

/** Now if we want to log all read attempts of the skillLevel property, we expand the
 * getSkillLevel method; and if we want to react to all write attempts, we expand the
 * setSkillLevel method, as in the following snippet:
 */

// function Ninja() {
//   let skillLevel;

//   this.getSkillLvel = () => {
//     report('Getting skill level value.');
//     return skillLevel;
//   };

//   this.setSkillLevel = (value) => {
//     report(`Modifying the skill level from ${skillLevel} to ${value}.`);
//     skillLevel = value;
//   };
// }

// const ninja = new Ninja();
// ninja.setSkillLevel(20);
// assert(ninja.getSkillLvel() === 20, 'Now, the skill level is 20.');

/**
 * This is great. We can easily react to all interactions with our properties by plugging in,
 * for example, logging, data validation, or other side effects such as UI modifications.
 */

/**
 * But on nagging concern might be popping into your mind. The skillLevel property is a
 * value property; it references data (the number 10), and not a function. Unfortunately, in
 * order to take advantage of all the benefits of controlled access, all our interactions with
 * the property have to be made by explicitly calling the associated methods, which is, to be
 * honest, slightly awkward.
 *
 * Luckily, Javascript has built-in support for true getters and setters: properties that are
 * accessed as normal data properties (for example, ninja.skillLevel), but that are methods that
 * can compute the value of a requested property, validate the passed-in value, or whatever else
 * we need them to do. Let's take a look a this built-in support.
 */

/**
 * 7.4 - Using Javascript "classes" in ES6
 */

// SuperClass: Person
class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first: first,
      last: last,
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  get fullname() {
    return `${this.name.first} ${this.name.last}`;
  }

  bio() {
    // Pronoun and prefix
    let prefix = '';
    let pronoun = '';

    if (
      this.gender === 'male' ||
      this.gender === 'Male' ||
      this.gender === 'm' ||
      this.gender === 'M'
    ) {
      prefix = 'He likes';
      pronoun = 'His';
    } else {
      prefix = 'She likes';
      pronoun = 'Her';
    }

    // Interests
    let interestsString = '';
    let len = this.interests.length;
    if (len === 1) {
      interestsString = this.interests[0];
    } else if (len === 2) {
      interestsString = `${this.interests[0]} and ${this.interests[1]}`;
    } else {
      for (let i = 0; i < len; i++) {
        if (i === len - 1) {
          interestsString += `and ${this.interests[i]}`;
        } else {
          interestsString += `${this.interests[i]}, `;
        }
      }
    }

    return `${pronoun} name is ${this.fullname}. ${prefix} ${interestsString}.`;
  }
}

// Creates an object instance of Person
// let person = new Person('Alex', 'Fegurson', 75, 'male', ['soccer', 'badminton', 'cycling']);
// console.log(person.bio());

// SubClass: Teacher
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject) {
    super(first, last, age, gender, interests);
    this.subject = subject;
  }

  bio() {
    let string = super.bio();
  }
}

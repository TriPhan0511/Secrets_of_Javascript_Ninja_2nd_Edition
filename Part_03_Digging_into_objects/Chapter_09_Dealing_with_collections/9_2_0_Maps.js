/** 9.2 - Maps */

/**
 * Imagine that you're a developer at freelanceninja.com, a site that wants to cater to a
 * more international audience. For each piece of text on the website - for example,
 * "Ninjas for hire" - you'd like to create a mapping to each targeted language, such as
 * "レンタル用の忍者" in Japanese, "忍者出租" in Chinese, or "고용 닌자" in Korean.
 * These collections, which map a key to a specific value, are called by different names
 * in different programming languages, but most often they're known as dictionaries or maps.
 */

/**
 * But how do you efficiently manage this localization in Javascript? One traditional approach
 * is to take advantage of the fact that objects are collections of named properties and values,
 * and create something like the following dictionary:
 */

const dictionary = {
  ja: {
    'Ninjas for hire': 'レンタル用の忍者',
  },
  ch: {
    'Ninja for hire': '忍者出租',
  },
  ko: {
    'Ninja for hire': '고용 닌자',
  },
};

assert(dictionary.ja['Ninjas for hire'] === 'レンタル用の忍者', 'レンタル用の忍者');

/**
 * At first glance, this may seem like a perfectly fine approach to this problem, and for
 * this example, it isn't half bad. But unfortunately, in general, you can't rely on it.
 */

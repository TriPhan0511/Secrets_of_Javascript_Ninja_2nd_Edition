/** 8.2.3 - Using proxies to autopopulate properties */

/**
 * In addition to simplifying logging, proxies can be used for autopopulating properties.
 * For example, imagine that you have to model your computer's folder structure, in which
 * a folder object can have properties that can also be folders. Now imagine that you 
 * have to model a file at the end of a long path, such as this:
 * 
      rootFolder.ninjasDir.firstNinjaDir.ninjaFile = "yoshi.txt";
 * 
 * To create this, you might write something along the following lines:
 * 
      const rootFolder = new Folder();
      rootFolder.ninjasDir = new Folder();
      rootFolder.ninjasDir.firstNinjaDir = new Folder();
      rootFolder.ninjasDir.firstNinjaDir.ninjaFile = "yoshi.txt";
 * 
 * Seems a tad more tedious than necessary, doesn't it? This is where autopopulating
 * properties comes into play; just yake a look at the following example:
 */

/** Listing 8.11 - Autopopulating properties with proxies */

function Folder() {
  return new Proxy(
    {},
    {
      get: (target, property) => {
        report(`Reading ${property}`);

        // If the accessed property doesn't exist, we create it.
        if (!(property in target)) {
          target[property] = new Folder();
        }

        return target[property];
      },
    }
  );
}

const rootFolder = new Folder();

try {
  // Whenever a property is accessed, the get trap,
  // which creates a property if it doesn't exist, is activated
  rootFolder.ninjasDir.firstNinjaDir.ninjaFile = 'yoshi.txt';
  // No exception will be raised.
  pass("An exception wasn't raised.");
} catch (err) {
  fail('An exception has occured.');
}

/**
 * Normally, if we consider only the following code, we'd expect an exception to be raised:
 * 
      const rootFolder = new Folder();
      rootFolder.ninjasDir.firstNinjaDir.ninjaFile = "yoshi.txt";
 * 
 * We're accessing a property, firstNinjaDir, of an undefined property, ninjasDir, of the
 * rootFolder object. But if we run the code, you see that all is well.
 * 
 * This happens because we're using proxies. Everytime we access a property, 
 * the proxy get trap is activated. If our folder object already contains the requested
 * property, its values is returned, and if it doesn't, a new folder is created and 
 * assigned to the property. This is how two of our properties, ninjasDir and
 * firstNinjaDir, are created. Requesting a value of an uninitialized property trigger
 * its creation.
 */

/**
 * Finally, we have a tool for riding ourselves of some cases of the pesky null exception!
 */

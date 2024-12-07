// Character sets
const SPECIAL_CHARACTERS = [
  "@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", ".",
];
const NUMERIC_CHARACTERS = "0123456789".split("");
const LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Prompts user for password options.
 * @returns {Object} An object containing password options.
 */
function getPasswordOptions() {
  alert("To generate a password, enter its length and choose options.");

  let passwordLength = parseInt(prompt("Enter password length (10-64):"));
  
  // Validate password length
  while (isNaN(passwordLength) || passwordLength < 10 || passwordLength > 64) {
    alert("Invalid input. Length must be a number between 10 and 64.");
    passwordLength = parseInt(prompt("Enter password length (10-64):"));
  }

  // Get user preferences
  const includeLowercase = confirm("Include lowercase characters?");
  const includeUppercase = confirm("Include uppercase characters?");
  const includeNumbers = confirm("Include numeric characters?");
  const includeSpecial = confirm("Include special characters?");
  
  // Ensure at least one character set is selected
  if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecial) {
    alert("You must select at least one character type. Defaulting to all types.");
    return {
      length: passwordLength,
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSpecial: true,
    };
  }

  return {
    length: passwordLength,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSpecial,
  };
}

/**
 * Selects a random element from an array.
 * @param {Array} arr - The array to select from.
 * @returns {string} A random element from the array.
 */
function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a random password based on user-selected options.
 * @returns {string} The generated password.
 */
function generatePassword() {
  const options = getPasswordOptions();

  // Build the character pool
  let characterPool = [];
  if (options.includeLowercase) characterPool.push(...LOWERCASE_CHARACTERS);
  if (options.includeUppercase) characterPool.push(...UPPERCASE_CHARACTERS);
  if (options.includeNumbers) characterPool.push(...NUMERIC_CHARACTERS);
  if (options.includeSpecial) characterPool.push(...SPECIAL_CHARACTERS);

  // Ensure at least one character from each selected type is included
  let password = [];
  if (options.includeLowercase) password.push(getRandomFromArray(LOWERCASE_CHARACTERS));
  if (options.includeUppercase) password.push(getRandomFromArray(UPPERCASE_CHARACTERS));
  if (options.includeNumbers) password.push(getRandomFromArray(NUMERIC_CHARACTERS));
  if (options.includeSpecial) password.push(getRandomFromArray(SPECIAL_CHARACTERS));

  // Fill the rest of the password length with random characters from the pool
  while (password.length < options.length) {
    password.push(getRandomFromArray(characterPool));
  }

  // Shuffle the password to ensure randomness
  password = password.sort(() => Math.random() - 0.5);

  return password.join("");
}

// Event handlers
const generateBtn = document.querySelector("#generate");
const passwordText = document.querySelector("#password");

/**
 * Writes the generated password to the password input field.
 */
function writePassword() {
  const password = generatePassword();
  passwordText.value = password;
}

// Attach event listener to the generate button
generateBtn.addEventListener("click", writePassword);

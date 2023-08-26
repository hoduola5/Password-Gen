const specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];
const numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowerCasedCharacters = "abcdefghijklmnopqrstuvwxyz".split("");
const upperCasedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getPasswordOptions() {
  alert("To generate a password, enter its length and choose options.");
  let passwordLength, test;

  while (isNaN(passwordLength) || passwordLength < 10 || passwordLength > 64) {
    alert("Invalid number or not within the range.");
    passwordLength = prompt("Enter password length (10-64):");
  }

  const pwdOptionsObj = {
    length: passwordLength,
    lower: confirm("Include lowercase characters?"),
    upper: confirm("Include uppercase characters?"),
    number: confirm("Include numeric characters?"),
    character: confirm("Include special characters?"),
  };
  return pwdOptionsObj;
}

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePassword() {
  const options = getPasswordOptions();
  let allChars = [];
  if (options.character) allChars.push(...specialCharacters);
  if (options.number) allChars.push(...numericCharacters);
  if (options.lower) allChars.push(...lowerCasedCharacters);
  if (options.upper) allChars.push(...upperCasedCharacters);

  if (allChars.length === 0) return "Please select at least one option.";

  let result = "";
  for (let i = 0; i < options.length; i++) {
    result += getRandomFromArray(allChars);
  }
  return result;
}

const generateBtn = document.querySelector("#generate");
const passwordText = document.querySelector("#password");

function writePassword() {
  passwordText.value = generatePassword();
}

generateBtn.addEventListener("click", writePassword);

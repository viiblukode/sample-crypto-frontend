/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: "react-native",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
  "moduleFileExtensions": ["ts", "tsx"]
};
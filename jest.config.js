module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testMatch: [
    "**/test/**/*.+(js)",
    "**/?(*.)+(spec|test).+(js)"
  ],
  transform: {
    "^.+\\.(js?)$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },

    coverageReporters: ["text-summary", "html"],
   
    setupFilesAfterEnv: ['./src/setupTests.js'],
  
}
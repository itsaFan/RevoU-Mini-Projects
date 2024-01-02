export default {
  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  // setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

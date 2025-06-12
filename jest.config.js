module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
    "\\.(jpg|jpeg|png|gif|svg|webp|ico)$":
      "<rootDir>/../__mocks__/file-mock.ts",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

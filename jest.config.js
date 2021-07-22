/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: 'jsdom',
};

module.exports = config;
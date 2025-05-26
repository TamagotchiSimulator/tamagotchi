import "@testing-library/jest-dom";

// Mock performance.now for tests
global.performance = global.performance || {
  now: () => Date.now(),
};

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame =
  global.requestAnimationFrame || ((cb) => setTimeout(cb, 16));
global.cancelAnimationFrame =
  global.cancelAnimationFrame || ((id) => clearTimeout(id));

// Ensure proper cleanup after each test
afterEach(() => {
  // Clear any timeouts that might be pending
  if (typeof jest !== "undefined") {
    jest.clearAllTimers();
  }
});

import '@testing-library/jest-dom';

export {};

globalThis.ResizeObserver = class implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

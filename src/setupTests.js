import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
configure({ adapter: new Adapter() });

const originalError = console.error;

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

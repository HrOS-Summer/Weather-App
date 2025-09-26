import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Attach jest-dom matchers to Vitest expect
expect.extend(matchers);

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	}),
});



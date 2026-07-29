/**
 * Base test fixture — extends Playwright's test with auto-cursor injection.
 * 
 * Usage in spec files:
 *   import { test, expect } from './fixtures/base';
 * 
 * This automatically injects the visual cursor indicator on every page.
 * The cursor shows as a red dot that follows mouse movements and flashes
 * yellow on click. Works in headed mode (headless: false).
 */
import { test as base } from '@playwright/test';
import { CURSOR_INIT_SCRIPT } from './cursor-helper';

export const test = base.extend<{ autoCursor: void }>({
  // Use context fixture to inject at context level — this ensures
  // the script runs on EVERY page/frame before any navigation
  autoCursor: [async ({ context }, use) => {
    await context.addInitScript(CURSOR_INIT_SCRIPT);
    await use();
  }, { auto: true }],
});

export { expect } from '@playwright/test';

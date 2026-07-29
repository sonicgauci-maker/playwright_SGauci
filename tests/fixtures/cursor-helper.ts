/**
 * Cursor Helper — Injects a visible cursor indicator on every page.
 * 
 * Playwright dispatches real DOM events (mousemove, click etc.) so the
 * cursor dot WILL follow Playwright actions. The key is injecting the
 * script via addInitScript so it's present before any interaction, and
 * listening on window (capture phase) to catch events before any handler
 * can stopPropagation.
 */
import { Page, BrowserContext } from '@playwright/test';

export const CURSOR_INIT_SCRIPT = `
(() => {
  // Prevent duplicate injection
  if (window.__pw_cursor_installed__) return;
  window.__pw_cursor_installed__ = true;

  function createCursor() {
    // Remove existing cursor if any (e.g. from previous navigation)
    const existing = document.getElementById('__pw_cursor__');
    if (existing) existing.remove();

    const cursor = document.createElement('div');
    cursor.id = '__pw_cursor__';
    Object.assign(cursor.style, {
      position: 'fixed',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      border: '3px solid rgba(139, 0, 0, 0.9)',
      boxShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
      zIndex: '2147483647',
      pointerEvents: 'none',
      top: '-100px',
      left: '-100px',
      transform: 'translate(-50%, -50%)',
      transition: 'top 0.02s linear, left 0.02s linear, background-color 0.1s, transform 0.1s',
      display: 'block'
    });

    // Append to body or documentElement
    const container = document.body || document.documentElement;
    container.appendChild(cursor);
    return cursor;
  }

  let cursor = null;

  function ensureCursor() {
    if (!cursor || !document.getElementById('__pw_cursor__')) {
      cursor = createCursor();
    }
    return cursor;
  }

  // Use capture phase on window to catch ALL events including Playwright's
  window.addEventListener('mousemove', (e) => {
    const c = ensureCursor();
    c.style.top = e.clientY + 'px';
    c.style.left = e.clientX + 'px';
  }, true);

  window.addEventListener('mousedown', (e) => {
    const c = ensureCursor();
    c.style.top = e.clientY + 'px';
    c.style.left = e.clientX + 'px';
    c.style.backgroundColor = 'rgba(255, 255, 0, 0.9)';
    c.style.transform = 'translate(-50%, -50%) scale(1.8)';
    c.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.8)';
  }, true);

  window.addEventListener('mouseup', () => {
    const c = ensureCursor();
    c.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
    c.style.transform = 'translate(-50%, -50%) scale(1)';
    c.style.boxShadow = '0 0 8px rgba(255, 0, 0, 0.5)';
  }, true);

  // Click ripple effect
  window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    Object.assign(ripple.style, {
      position: 'fixed',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      border: '3px solid rgba(255, 0, 0, 0.8)',
      zIndex: '2147483646',
      pointerEvents: 'none',
      top: e.clientY + 'px',
      left: e.clientX + 'px',
      transform: 'translate(-50%, -50%) scale(1)',
      opacity: '1',
      transition: 'transform 0.4s ease-out, opacity 0.4s ease-out'
    });
    const container = document.body || document.documentElement;
    container.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(3)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 500);
  }, true);

  // Ensure cursor exists once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureCursor);
  } else {
    ensureCursor();
  }

  // Re-create cursor if body gets replaced (SPA navigation)
  const observer = new MutationObserver(() => {
    if (!document.getElementById('__pw_cursor__')) {
      cursor = createCursor();
    }
  });
  
  if (document.body) {
    observer.observe(document.body, { childList: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true });
    });
  }
})();
`;

/**
 * Install the visual cursor on a specific page.
 */
export async function installCursor(page: Page): Promise<void> {
  await page.addInitScript(CURSOR_INIT_SCRIPT);
}

/**
 * Install the visual cursor on all pages in a browser context.
 */
export async function installCursorOnContext(context: BrowserContext): Promise<void> {
  await context.addInitScript(CURSOR_INIT_SCRIPT);
}

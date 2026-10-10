import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
test('every local asset and section link resolves', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [, attr, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (value.startsWith('#')) { if (value.length > 1) assert.ok(ids.has(value.slice(1)), value); }
    else if (value.startsWith('https://')) assert.ok(new URL(value).hostname);
    else assert.ok(existsSync(new URL('../' + value, import.meta.url)), `${attr}=${value}`);
  }
  assert.match(html, /ILLUSTRATIVE PREVIEW/);
  assert.match(html, /full-stack demonstration/);
});
function navigationHarness(matches) {
  const handlers = {};
  const attributes = { 'aria-expanded': 'false' };
  const toggle = { hidden: true, setAttribute: (k,v) => attributes[k] = v, getAttribute: k => attributes[k], addEventListener: (k,v) => handlers['toggle:' + k] = v, focus: () => toggle.focused = true };
  const navigation = { hidden: false, addEventListener: (k,v) => handlers['nav:' + k] = v };
  const mobile = { matches, addEventListener: (k,v) => handlers['media:' + k] = v };
  const document = { querySelector: s => s === '.menu-toggle' ? toggle : navigation, addEventListener: (k,v) => handlers['doc:' + k] = v };
  vm.runInNewContext(script, { document, window: { matchMedia: () => mobile } });
  return { toggle, navigation, mobile, handlers, attributes };
}
test('mobile menu opens, closes after navigation and restores focus on Escape', () => {
  const h = navigationHarness(true);
  assert.equal(h.navigation.hidden, true);
  h.handlers['toggle:click']();
  assert.equal(h.navigation.hidden, false);
  assert.equal(h.attributes['aria-expanded'], 'true');
  h.handlers['nav:click']({ target: { closest: () => ({}) } });
  assert.equal(h.navigation.hidden, true);
  h.handlers['toggle:click']();
  h.handlers['doc:keydown']({ key: 'Escape' });
  assert.equal(h.navigation.hidden, true);
  assert.equal(h.toggle.focused, true);
});
test('desktop navigation stays available across viewport changes', () => {
  const h = navigationHarness(false);
  assert.equal(h.navigation.hidden, false);
  h.mobile.matches = true;
  h.handlers['media:change']();
  assert.equal(h.navigation.hidden, true);
  h.mobile.matches = false;
  h.handlers['media:change']();
  assert.equal(h.navigation.hidden, false);
});

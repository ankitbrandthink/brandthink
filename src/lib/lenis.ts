import type Lenis from "lenis";

// Fixed navbar height (h-20 = 80px) plus a little breathing room, so a
// scrolled-to section doesn't land tucked directly under the navbar.
export const SCROLL_OFFSET = 50;

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance() {
  return instance;
}

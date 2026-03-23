## Tools
Accessible Rich Internet Applications (**ARIA**) is a set of attributes used to make web content more accessible, particularly for users of assistive technologies like screen readers. 

Because ARIA is "invisible" to sighted users, you need specific tools to ensure it is implemented correctly. Here are the top tools and websites to help you master and test ARIA.

---

## 1. Automated Testing Tools
These tools scan your code for common ARIA errors, such as missing labels or invalid roles.

* **[axe DevTools](https://www.deque.com/axe/)**: The industry standard. It’s a browser extension that finds issues like "ARIA hidden element must not be focusable" and provides clear instructions on how to fix them.
* **[WAVE (Web Accessibility Evaluation Tool)](https://wave.webaim.org/)**: Created by WebAIM, this tool provides a visual overlay of your site. It identifies ARIA landmarks, labels, and roles directly on the page so you can see if they match the visual layout.
* **[Google Lighthouse](https://developers.google.com/web/tools/lighthouse)**: Built into Chrome DevTools (under the "Lighthouse" tab). It uses the axe engine to run a quick audit of ARIA best practices and gives you an accessibility score.

---

## 2. Developer-Focused Inspection Tools
These tools help you "see" the Accessibility Tree—the data structure browsers send to screen readers.

* **[ARIA DevTools](https://chromewebstore.google.com/detail/aria-devtools/dneemiigcbbgbdjlcdjjnianlikimpck)**: A Chrome extension that replaces your visual CSS layout with an "ARIA-only" view. It displays every element by its role (e.g., "button," "heading") and name, making it easy to spot missing labels.
* **[Firefox Accessibility Inspector](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)**: Built directly into Firefox. Right-click any element and select "Inspect Accessibility Properties" to see exactly what role, name, and states are being exposed.
* **[Accessibility Insights for Web](https://accessibilityinsights.io/)**: A powerful tool from Microsoft that includes "FastPass" (automated) and "Tab Stops" (visualizing keyboard navigation) to ensure your ARIA roles are actually reachable.

---

## 3. Screen Reader Testing (Manual)
Manual testing is the only way to ensure the *experience* of your ARIA implementation is good.

* **[NVDA (NonVisual Desktop Access)](https://www.nvaccess.org/)**: A free, open-source screen reader for Windows. It is the best tool for testing how your ARIA attributes (like `aria-live` or `aria-expanded`) sound in real-time.
* **[VoiceOver](https://www.apple.com/accessibility/vision/)**: Built into all macOS and iOS devices. It’s the primary way to test ARIA support on Apple products.
* **[Guidepup](https://www.guidepup.dev/)**: A newer tool for automated screen reader testing using code (JavaScript/Python). It allows you to write scripts that "listen" to what a screen reader would say.

---

## 4. Educational & Reference Sites
If you aren't sure which ARIA attribute to use, these are the authoritative sources:

* **[ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)**: The "gold standard." It provides code patterns and functional examples for complex widgets like accordions, tabs, and modals.
* **[Can I Use: ARIA](https://caniuse.com/#search=aria)**: Check this site to see if a specific ARIA attribute is supported by the browsers your audience uses.
* **[MDN Web Docs: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)**: A comprehensive technical manual for every ARIA role, state, and property.




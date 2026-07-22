Cheposh Park booking prototype
==============================

What is included
----------------
- index.html          - ready-to-open prototype.
- ChiposhBooking.jsx  - source React component for further editing.
- *.png, *.svg        - local images, map and UI assets.
- *.mp4               - local video backgrounds and activity videos.

How to open
-----------
Option 1: open index.html in a modern browser.

Option 2: run a local static server from this folder:

  python3 -m http.server 4174

Then open:

  http://127.0.0.1:4174/index.html

External dependencies
---------------------
The prototype uses CDN imports for React 18, Framer Motion, Tailwind and Babel:
- cdn.tailwindcss.com
- unpkg.com
- esm.sh

So the first load on another device needs internet access. Local media assets
are included in this archive and should stay next to index.html.

Fonts
-----
No separate font files are required. The prototype uses system Apple fonts
when available and falls back to Helvetica Neue / Arial / sans-serif.

Editing notes
-------------
Edit ChiposhBooking.jsx first. The current index.html contains an inline copy
of the same component for easy browser viewing.

Server utilities helpers

This folder contains small utility functions used across the server (e.g., response formatting, async wrapper, common validators).

Files:
- helpers.js — small helper functions (asyncHandler, sendResponse, notFound)

Usage:
- Import the helper functions where needed:

```js
const { asyncHandler, sendResponse } = require('./utils/helpers');
```

Contributions:
- Keep small, focused utilities here and add unit tests where applicable.

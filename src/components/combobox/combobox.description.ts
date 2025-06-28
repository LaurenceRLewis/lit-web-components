import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const description = `
### ARIA Combobox (List)

This component implements a [WAI-ARIA Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) with \`aria-autocomplete="list"\`, where options are shown in a popup listbox. It uses \`role="combobox"\`, a listbox popup, and includes keyboard interaction and screen reader announcements.

#### Accessibility Features

- Uses \`aria-autocomplete="list"\` with \`role="combobox"\`
- Supports \`aria-activedescendant\` for current selection
- Results are listed in a separate \`role="listbox"\` container
- Options use \`role="option"\` and \`aria-selected\`
- Results announced via live region (\`aria-live="assertive"\`)
- Described by help text and result count with \`aria-describedby\`

#### Keyboard Interaction

- **Down Arrow**: opens listbox or moves focus to next option
- **Up Arrow**: opens listbox or moves focus to previous option
- **Enter**: selects focused option
- **Escape**: closes listbox and resets selection
`;

export default () => html`${unsafeHTML(description)}`;
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('modular-sheet-dialog-content')
export class ModularSheetDialogContent extends LitElement {
  static styles = css`
    :host { display: block; }
    h3 { margin-top: 0.5rem; }
    code { background: #f6f6f6; padding: 0 0.25rem; border-radius: 3px; }
  `;

  render() {
    return html`
      <h3>Control Props</h3>
      <p>
        This component has two control props: <code>modal</code> and <code>dialogType</code>.
      </p>
      <ul>
        <li><code>modal</code>: Determines if the sheet is modal. Focus is trapped inside the dialog.</li>
        <li><code>dialogType</code>: Defines the type of dialog to display, either "sheet" or "standard".</li>
      </ul>
      <h3>Sheet Dialog</h3>
      <p>
        Sheet dialogs are ideal for displaying content related to the current context. They typically slide in
        from the edge of the screen and cover a portion of the content, keeping the page context visible.
      </p>
    `;
  }
}

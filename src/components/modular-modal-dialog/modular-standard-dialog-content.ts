import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('modular-standard-dialog-content')
export class ModularStandardDialogContent extends LitElement {
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
        <li><code>modal</code>: Determines if the dialog is modal. Focus is trapped inside the dialog.</li>
        <li><code>dialogType</code>: "sheet" or "standard".</li>
      </ul>
      <h3>Standard Dialog</h3>
      <p>
        Standard dialogs appear centered with a backdrop that prevents interaction with the content underneath.
        Use them for confirmations, forms, or tasks that require the user’s full attention.
      </p>
    `;
  }
}

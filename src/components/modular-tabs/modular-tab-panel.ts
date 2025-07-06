import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('modular-tab-panel')
export class ModularTabPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    [hidden] {
      display: none !important;
    }
  `;

  @property({ type: String }) id = '';
  @property({ type: String }) labelledBy = '';
  @property({ type: Boolean, reflect: true }) hidden = false;
  @property({ type: Number }) tabindex = -1;

  render() {
    return html`
      <div
        id=${this.id}
        role="tabpanel"
        aria-labelledby=${this.labelledBy}
        ?hidden=${this.hidden}
        tabindex=${this.tabindex}
      >
        <slot></slot>
      </div>
    `;
  }
}

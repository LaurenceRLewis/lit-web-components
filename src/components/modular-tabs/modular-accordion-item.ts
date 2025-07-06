import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('modular-accordion-item')
export class ModularAccordionItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }

    .accordionButton {
      width: 100%;
      text-align: left;
      padding: 10px;
      font-size: 16px;
      border: 1px solid  rgba(156, 39, 176, 1);
      color: rgba(0, 0, 0, 1);
      background-color: rgba(209, 203, 219, 1);
      outline: none;
      cursor: pointer;
    }

    .accordionButton + .accordionTabPanel {
      border-top: none;
    }

    .accordionButton:focus-visible {
      border-color: green;
    }

    .accordionButton[aria-expanded="true"] {
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(156, 39, 176, 1);
    }

    .accordionButton[aria-expanded="true"]:focus-visible {
      border-color: blue;
    }

    .accordionTabPanel {
      padding: 15px;
      border: 1px solid #ccc;
      border-top: none;
    }

    .accordionTabPanel[hidden] {
      display: none;
    }
  `;

  @property({ type: String }) heading = '';
  @property({ type: Boolean }) expanded = false;
  @state() private panelId = `panel-${Math.random().toString(36).slice(2)}`;

  private toggle() {
    this.dispatchEvent(
      new CustomEvent('toggle', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        type="button"
        class="accordionButton"
        aria-expanded=${this.expanded}
        aria-controls=${this.panelId}
        @click=${this.toggle}
      >
        ${this.heading}
      </button>
      <div
        id=${this.panelId}
        class="accordionTabPanel"
        ?hidden=${!this.expanded}
        role="region"
      >
        <slot></slot>
      </div>
    `;
  }
}

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('modular-tab')
export class ModularTab extends LitElement {
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = css`
    :host {
      display: contents;
    }

    .tab {
      flex-grow: 1;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 10px;
      font-size: 16px;
      border-bottom: 3px solid transparent;
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }

    .tab:focus-visible {
      border-bottom: 3px solid green;
    }

    .tab[aria-selected="true"]:focus-visible {
      border-bottom: 3px solid blue;
    }

    .tab[aria-selected="true"] {
      font-weight: bold;
      border-bottom-color: #9c27b0;
      background-color: #d1cbdb;
    }
  `;

  @property({ type: String }) id = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: String }) textColor = 'rgba(0, 0, 0, 1)';
  @property({ type: Object }) background = {
    default: 'rgba(209, 203, 219, 1)',
    selected: 'rgba(156, 39, 176, 1)',
  };
  @property({ type: String }) triggerActivation: 'manual' | 'automated' = 'manual';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', this.selected ? '0' : '-1');
  }

  updated() {
    this.setAttribute('tabindex', this.selected ? '0' : '-1');
  }

  private handleClick() {
    this.dispatchTabSelected();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.dispatchTabSelected();
    }
  }

  private handleFocus() {
    if (this.triggerActivation === 'automated') {
      this.dispatchTabSelected();
    }
  }

  private dispatchTabSelected() {
    this.dispatchEvent(
      new CustomEvent('tab-selected', {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        class="tab"
        id=${this.id}
        role="tab"
        aria-selected=${this.selected}
        aria-controls="panel-${this.id}"
        style=${styleMap({
          color: this.textColor,
          backgroundColor: this.selected
            ? this.background.selected
            : this.background.default,
        })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @focus=${this.handleFocus}
      >
        <slot></slot>
      </button>
    `;
  }
}

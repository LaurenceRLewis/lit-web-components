import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('input-testing')
export class InputTesting extends LitElement {
  static styles = css`
    :host {
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
      display: block;
    }

    label {
      font-weight: bold;
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      width: 100%;
      max-width: 300px;
      display: block;
    }
  `;

  @property({ type: String }) associationType: string = 'label-and-input-in-same-shadow';
  @property({ type: String }) inputType: string = 'text';
  @property({ type: String }) autoComplete: string = '';
  @property({ type: String }) ariaLabel: string = '';
  @property({ type: String }) inputId: string = 'input-id-123';
  @property({ type: String }) labelText: string = 'First name';

  render() {
    switch (this.associationType) {
      case 'label-in-light-slot-input-in-shadow':
        return html`
          <section>
            <label for="${this.inputId}">${this.labelText}</label>
            <input
              id="${this.inputId}"
              type="${this.inputType}"
              aria-label=${this.ariaLabel || nothing}
              autocomplete=${this.autoComplete || nothing}
            />
          </section>
        `;

      case 'label-in-one-shadow-input-in-another':
        return html`
          <section>
            <input
              id="${this.inputId}"
              type="${this.inputType}"
              aria-label=${this.ariaLabel || nothing}
              autocomplete=${this.autoComplete || nothing}
            />
            <p>Label must be added externally with <code>for="${this.inputId}"</code></p>
          </section>
        `;

      case 'label-and-input-in-same-shadow':
      default:
        return html`
          <section>
            <label for="${this.inputId}">${this.labelText}</label>
            <input
              id="${this.inputId}"
              type="${this.inputType}"
              aria-label=${this.ariaLabel || nothing}
              autocomplete=${this.autoComplete || nothing}
            />
          </section>
        `;
    }
  }
}

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('db-form-input')
export class FormInput extends LitElement {
  static styles = css`
    :host {
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }

    ::slotted(label) {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }

    input {
      width: 100%;
      max-width: 300px;
      padding: 8px;
      font-size: 1rem;
      box-sizing: border-box;
    }
  `;

  @property({ type: String }) inputType: 'text' | 'email' | 'tel' | 'url' = 'text';
  @property({ type: String }) autoComplete:
    | ''
    | 'name'
    | 'given-name'
    | 'family-name'
    | 'email'
    | 'tel'
    | 'username' = '';
  @property({ type: String }) ariaLabel = '';
  @property({ type: String, reflect: true }) inputId = `input-${Math.random().toString(36).slice(2, 8)}`;
  @property({ type: String }) labelText = '';

  render() {
    const hasLabelSlot = !!this.querySelector('[slot="label"]');
    const showFallback = this.labelText && !hasLabelSlot;

    return html`
      ${showFallback
        ? html`<label for=${this.inputId}>${this.labelText}</label>`
        : html`<slot name="label"></slot>`}

      <input
        id=${this.inputId}
        type=${this.inputType}
        aria-label=${this.ariaLabel || nothing}
        autocomplete=${this.autoComplete || nothing}
      />
    `;
  }
}

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('form-input')
export class FormInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 8px;
      font-size: 1rem;
      box-sizing: border-box;
    }
  `;

  @property({ type: String }) label: 'Given name' | 'Family name' | 'Email' | 'Mobile' = 'Given name';

  @state()
  private inputId = `input-${Math.random().toString(36).slice(2, 8)}`;

  private get inputProps() {
    switch (this.label) {
      case 'Family name':
        return { type: 'text', autocomplete: 'family-name' };
      case 'Email':
        return { type: 'email', autocomplete: 'email' };
      case 'Mobile':
        return { type: 'tel', autocomplete: 'tel' };
      default:
        return { type: 'text', autocomplete: 'given-name' };
    }
  }

  render() {
    const { type, autocomplete } = this.inputProps;

    return html`
      <label for=${this.inputId}>${this.label}</label>
      <input id=${this.inputId} type=${type} autocomplete=${autocomplete} />
    `;
  }
}
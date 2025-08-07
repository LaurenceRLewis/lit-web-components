import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

@customElement('shadow-boundaries')
export class ShadowBoundaries extends LitElement {
  @property({ type: String }) inputId = 'input-cross-shadow';
  @property({ type: String }) labelledById = '';
  @property({ type: String }) ariaLabel = '';

  @queryAssignedElements({ slot: 'label' })
  slottedLabels!: Element[];

  static styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
    }

    ::slotted(label) {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .fallback-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
  `;

  render() {
    const showFallback =
      (!this.slottedLabels || this.slottedLabels.length === 0) &&
      !!this.ariaLabel;

    return html`
      <slot name="label"></slot>
      ${showFallback
        ? html`<span class="fallback-label">${this.ariaLabel}</span>`
        : null}
      <input
        type="text"
        id=${this.inputId}
        aria-labelledby=${this.labelledById || undefined}
        aria-label=${this.ariaLabel || undefined}
      />
    `;
  }
}

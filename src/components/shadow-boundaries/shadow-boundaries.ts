import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

/**
 * Accessible input component with optional label slot.
 * If useSlotAsAccessibleName is true, the label slot content is extracted
 * and applied as aria-label to the inner input.
 */
@customElement('shadow-input-element')
export class ShadowInputElement extends LitElement {
  @property({ type: String, attribute: 'inputid' }) inputId = 'shared-id';
  @property({ type: String }) type: 'text' | 'email' | 'tel' = 'text';
  @property({ type: Boolean }) useSlotAsAccessibleName = false;

  @query('slot[name="label"]') private labelSlot!: HTMLSlotElement;
  @query('input') private inputEl!: HTMLInputElement;

  static styles = css`
    ::slotted(label[slot="label"]) {
      display: block;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    input {
      display: block;
      margin-top: 0.25rem;
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
      font: inherit;
    }
  `;

  protected firstUpdated() {
    this._syncFromSlot();
    this.labelSlot?.addEventListener('slotchange', this._syncFromSlot);
  }

  disconnectedCallback(): void {
    this.labelSlot?.removeEventListener('slotchange', this._syncFromSlot);
    super.disconnectedCallback();
  }

  private _syncFromSlot = () => {
    if (!this.inputEl || !this.labelSlot) return;

    this.inputEl.removeAttribute('aria-label');

    const nodes = this.labelSlot.assignedNodes({ flatten: true });
    const text = nodes
      .map((n) => (n.nodeType === Node.TEXT_NODE ? n.textContent : (n as HTMLElement).innerText))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Set aria-hidden only when we're synthesizing a name
    nodes.forEach((n) => {
      if (n instanceof HTMLElement) {
        if (this.useSlotAsAccessibleName) n.setAttribute('aria-hidden', 'true');
        else n.removeAttribute('aria-hidden');
      }
    });

    if (this.useSlotAsAccessibleName && text) {
      this.inputEl.setAttribute('aria-label', text);
    }
  };

  render() {
    return html`
      <slot name="label"></slot>
      <input id=${this.inputId} type=${this.type} />
    `;
  }
}

@customElement('label-host-element')
export class LabelHostElement extends LitElement {
  render() {
    return html`<slot name="forward-label"></slot>`;
  }
}

@customElement('label-receiver-element')
export class LabelReceiverElement extends LitElement {
  @property({ type: String }) inputId = 'shared-id';
  @property({ type: String }) type: 'text' | 'email' | 'tel' = 'text';
  @property({ type: Boolean }) useSlotAsAccessibleName = false;

  @query('slot[name="forward-label"]') private fwdSlot!: HTMLSlotElement;
  @query('input') private inputEl!: HTMLInputElement;

  static styles = css`
    :host {
      display: block;
      font-family: inherit;
      line-height: 1.5;
      padding: 0.5rem 0;
    }
    ::slotted([slot="forward-label"]) {
      display: block;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    input {
      display: block;
      border: 1px solid #ccc;
      padding: 0.5rem;
      border-radius: 4px;
      font: inherit;
    }
  `;

  protected firstUpdated(): void {
    this._syncFromSlot();
    this.fwdSlot?.addEventListener('slotchange', this._syncFromSlot);
  }

  disconnectedCallback(): void {
    this.fwdSlot?.removeEventListener('slotchange', this._syncFromSlot);
    super.disconnectedCallback();
  }

  private _syncFromSlot = () => {
    if (!this.inputEl || !this.fwdSlot) return;

    this.inputEl.removeAttribute('aria-label');

    const nodes = this.fwdSlot.assignedNodes({ flatten: true });
    const text = nodes
      .map((n) => (n.nodeType === Node.TEXT_NODE ? n.textContent : (n as HTMLElement).innerText))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    nodes.forEach((n) => {
      if (n instanceof HTMLElement) {
        if (this.useSlotAsAccessibleName) n.setAttribute('aria-hidden', 'true');
        else n.removeAttribute('aria-hidden');
      }
    });

    if (this.useSlotAsAccessibleName && text) {
      this.inputEl.setAttribute('aria-label', text);
    }
  };

  render() {
    return html`
      <slot name="forward-label"></slot>
      <input id=${this.inputId} type=${this.type} />
    `;
  }
}

@customElement('given-name-input')
export class GivenNameInput extends LitElement {
  static styles = css`
    label,
    input {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
      font: inherit;
    }
  `;
  render() {
    return html`
      <label for="given">Given name</label>
      <input type="text" id="given" />
    `;
  }
}

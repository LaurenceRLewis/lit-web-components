import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('shadow-input-element')
class ShadowInputElement extends LitElement {
  @property({ type: String }) inputId = 'shared-id';

  static styles = css`
    input {
      display: block;
      margin-top: 0.5rem;
      border: 1px solid #ccc;
      background-color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
    }
  `;

  render() {
    return html`<input id=${this.inputId} type="text" />`;
  }
}

@customElement('label-host-element')
class LabelHostElement extends LitElement {
  render() {
    return html`<slot name="forward-label"></slot>`;
  }
}

@customElement('label-receiver-element')
class LabelReceiverElement extends LitElement {
  static styles = css`
  :host {
      display: block;
      font-family: Aptos, Bierstadt, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
      padding: 1rem;
    }
      
    ::slotted(label) {
      display: block;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    input {
      display: block;
      margin-top: 0.25rem;
      border: 1px solid #ccc;
      padding: 0.5rem;
      border-radius: 4px;
    }
  `;

  render() {
    return html`
      <slot name="forward-label"></slot>
      <input id="shared-id" type="email" />
    `;
  }
}

@customElement('given-name-input')
class GivenNameInput extends LitElement {
  static styles = css`
    label,
    input {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      border: var(--input-border, 1px solid #ccc);
      background-color: var(--input-bg, #fff);
      padding: var(--input-padding, 0.5rem);
      border-radius: var(--input-radius, 4px);
    }
  `;

  render() {
    return html`
      <label for="given">Given name</label>
      <input type="text" id="given" />
    `;
  }
}

@customElement('email-input')
class EmailInput extends LitElement {
  static styles = css`
    input {
      display: block;
      margin-top: 0.5rem;
      border: var(--input-border, 1px solid #ccc);
      background-color: var(--input-bg, #fff);
      padding: var(--input-padding, 0.5rem);
      border-radius: var(--input-radius, 4px);
    }
  `;

  render() {
    return html`<input type="email" id="email" />`;
  }
}

@customElement('mobile-input')
class MobileInput extends LitElement {
  static styles = css`
    input {
      display: block;
      margin-top: 0.5rem;
      border: var(--input-border, 1px solid #ccc);
      background-color: var(--input-bg, #fff);
      padding: var(--input-padding, 0.5rem);
      border-radius: var(--input-radius, 4px);
    }
  `;

  render() {
    return html`<input type="tel" id="mobile" aria-labelledby="mobile-label" />`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.querySelector('#mobile-label')) {
      const label = document.createElement('strong');
      label.id = 'mobile-label';
      label.textContent = 'Mobile';
      this.insertBefore(label, this.firstChild);
    }
  }
}

type ScenarioType = 'Valid' | 'Invalid' | 'Valid - May not be accessible';

type Scenario =
  | 'Shadow DOM Label and Input'
  | 'Light DOM Label with aria-labelledby'
  | 'Multiple Labels'
  | 'Label in Light Slot with Shadow Input'
  | 'Aria Labelledby from Light DOM'
  | 'Light DOM Label with Shadow Input'
  | 'Missing Input ID'
  | 'Label Without for'
  | 'Mismatched for and id'
  | 'Custom Association';

@customElement('shadow-boundaries')
export class NamingInputs extends LitElement {
  @property({ type: String }) scenarioType: ScenarioType = 'Valid';
  @property({ type: String }) scenario: Scenario = 'Custom Association';
  @property({ type: String }) associationType: string = 'Label in Light DOM, input in Shadow DOM';

  static styles = css`
    :host {
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
      display: block;
    }

    section {
      margin-bottom: 2rem;
    }

    label,
    strong,
    span {
      font-weight: bold;
      display: block;
    }

    given-name-input,
    email-input,
    mobile-input,
    shadow-input-element {
      --input-border: 2px solid #5941a9;
      --input-bg: #f9f5ff;
      --input-padding: 0.5rem;
      --input-radius: 6px;
    }
  `;

  private renderAssociationTypes() {
    switch (this.associationType) {
      case 'Label in Light DOM, input in Shadow DOM':
        return html`
          <section>
            <h2>Label in Light DOM, input in Shadow DOM</h2>
            <label for="shared-id">Your name</label>
            <shadow-input-element inputId="shared-id"></shadow-input-element>
          </section>
        `;
      case 'Label slot in one shadow dom, input in another':
        return html`
          <section>
            <h2>Label slot in one shadow dom, input in another</h2>
            <label-host-element>
              <label slot="forward-label" for="shared-id">Email address</label>
            </label-host-element>
            <label-receiver-element></label-receiver-element>
          </section>
        `;
      case 'Label in Light DOM and input in Shadow DOM (slot)':
        return html`
          <section>
            <h2>Label in Light DOM and input in Shadow DOM (slot)</h2>
            <shadow-input-element inputId="shared-id">
              <label slot="label" for="shared-id">Given name</label>
            </shadow-input-element>
          </section>
        `;
      default:
        return html`<p>Unknown associationType</p>`;
    }
  }

  render() {
    if (this.scenario === 'Custom Association') {
      return this.renderAssociationTypes();
    }

    switch (this.scenario) {
      case 'Shadow DOM Label and Input':
        return html`
          <section>
            <h2>Shadow DOM Label and Input</h2>
            <given-name-input></given-name-input>
          </section>
        `;
      case 'Light DOM Label with aria-labelledby':
        return html`
          <section>
            <h2>Light DOM Label with aria-labelledby</h2>
            <h3 id="labelLight">Your mobile</h3>
            <input type="tel" aria-labelledby="labelLight" />
          </section>
        `;
      case 'Multiple Labels':
        return html`
          <section>
            <h2>Multiple Labels</h2>
            <label for="multi">Email Address</label>
            <label for="multi">Primary Email</label>
            <input type="email" id="multi" />
          </section>
        `;
      case 'Label in Light Slot with Shadow Input':
        return html`
          <section>
            <h2>Label in Light Slot with Shadow Input</h2>
            <shadow-input-element>
              <label slot="label" for="shadowed-input">Given name</label>
            </shadow-input-element>
          </section>
        `;
      case 'Aria Labelledby from Light DOM':
        return html`
          <section>
            <h2>Aria Labelledby from Light DOM</h2>
            <mobile-input></mobile-input>
          </section>
        `;
      case 'Light DOM Label with Shadow Input':
        return html`
          <section>
            <h2>Light DOM Label with Shadow Input</h2>
            <label for="email">Email</label>
            <email-input></email-input>
          </section>
        `;
      case 'Missing Input ID':
        return html`
          <section>
            <h2>Missing Input ID</h2>
            <label for="broken-id">Broken Label</label>
            <input type="text" />
          </section>
        `;
      case 'Label Without for':
        return html`
          <section>
            <h2>Label Without for</h2>
            <label>Unlinked Label</label>
            <input type="text" id="orphaned-input" />
          </section>
        `;
      case 'Mismatched for and id':
        return html`
          <section>
            <h2>Mismatched for and id</h2>
            <label for="foo">Email</label>
            <input type="email" id="bar" />
          </section>
        `;
      default:
        return html`<p>Unknown scenario</p>`;
    }
  }
}

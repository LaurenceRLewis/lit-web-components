import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
      font-family: inherit;
      line-height: 1.5;
      padding: 1rem 0;
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

type ScenarioType = 'Valid' | 'Valid - May not be accessible' | 'Invalid';

@customElement('shadow-boundaries')
export class NamingInputs extends LitElement {
  // Controls
  @property({ type: String }) activateAssociationTypeTests: 'Yes' | 'No' = 'No';
  @property({ type: String }) scenarioType: ScenarioType = 'Valid';
  @property({ type: String }) scenario = '';
  @property({ type: String }) associationType = 'Label in Light DOM, input in Shadow DOM';

  // Internal state for filtering
  @state() private scenarioOptions: string[] = [];

  // All possible lists
  private validScenarios = [
    'Shadow DOM Label and Input',
    'Light DOM Label with aria-labelledby',
    'Multiple Labels',
    'Label in Light Slot with Shadow Input',
  ];
  private validMayNotBeAccessible = ['Aria Labelledby from Light DOM'];
  private invalidScenarios = [
    'Light DOM Label with Shadow Input',
    'Missing Input ID',
    'Label Without for',
    'Mismatched for and id',
  ];
  private associationOptions = [
    'Label in Light DOM, input in Shadow DOM',
    'Label slot in one shadow dom, input in another',
    'Label in Light DOM and input in Shadow DOM (slot)',
  ];

  static styles = css`
    :host {
      display: block;
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
      padding: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    fieldset {
      margin-bottom: 1.5rem;
      padding: 1rem;
      border: 2px solid var(--purple-300, #a886e5);
      border-radius: 6px;
    }
    legend {
      font-weight: bold;
      color: var(--purple-700, #5941a9);
    }
    label {
      display: block;
      margin-top: 0.5rem;
      font-weight: 500;
    }
    select {
      margin-top: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid var(--purple-300, #a886e5);
      border-radius: 4px;
      background: var(--white, #fff);
      color: var(--black, #262626);
    }
    input[type='radio'] {
      margin-right: 0.5rem;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateScenarioOptions();
  }
  updated(changed: Map<string, unknown>) {
    if (changed.has('scenarioType') || changed.has('activateAssociationTypeTests')) {
      this.updateScenarioOptions();
    }
  }

  private updateScenarioOptions() {
    if (this.activateAssociationTypeTests === 'Yes') {
      this.scenarioOptions = [];
      return;
    }
    switch (this.scenarioType) {
      case 'Valid':
        this.scenarioOptions = this.validScenarios;
        break;
      case 'Valid - May not be accessible':
        this.scenarioOptions = this.validMayNotBeAccessible;
        break;
      case 'Invalid':
        this.scenarioOptions = this.invalidScenarios;
        break;
    }
    // ensure valid default
    this.scenario = this.scenarioOptions[0] || '';
  }

  private handleChange(e: Event) {
    const t = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = t;
    if (name === 'activateAssociationTypeTests') {
      this.activateAssociationTypeTests = value as any;
    } else if (name === 'scenarioType') {
      this.scenarioType = value as ScenarioType;
    } else if (name === 'scenario') {
      this.scenario = value;
    } else if (name === 'associationType') {
      this.associationType = value;
    }
  }

  private renderAssociationTypes() {
    switch (this.associationType) {
      case this.associationOptions[0]:
      case this.associationOptions[1]:
      case this.associationOptions[2]:
        // reuse your existing cases...
        return html`<p>Association scenario: ${this.associationType}</p>`;
      default:
        return html`<p>Unknown associationType</p>`;
    }
  }

  private renderScenarioContent() {
    switch (this.scenario) {
      case this.validScenarios[0]:
      case this.validScenarios[1]:
      case this.validScenarios[2]:
      case this.validScenarios[3]:
        return html`<p>Scenario content: ${this.scenario}</p>`;
      case this.validMayNotBeAccessible[0]:
      case this.invalidScenarios[0]:
      case this.invalidScenarios[1]:
      case this.invalidScenarios[2]:
      case this.invalidScenarios[3]:
        return html`<p>Scenario content: ${this.scenario}</p>`;
      default:
        return html`<p>Unknown scenario</p>`;
    }
  }

  render() {
    const showAssoc = this.activateAssociationTypeTests === 'Yes';

    return html`
      <h1>Shadow Root Boundaries</h1>

      <label for="shared-id">Your name</label>
      <shadow-input-element inputId="shared-id"></shadow-input-element>

      <form @change=${this.handleChange}>
        <fieldset>
          <legend>Activate Association Type Tests</legend>
          <label>
            <input
              type="radio"
              name="activateAssociationTypeTests"
              value="No"
              ?checked=${this.activateAssociationTypeTests === 'No'}
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="activateAssociationTypeTests"
              value="Yes"
              ?checked=${this.activateAssociationTypeTests === 'Yes'}
            />
            Yes
          </label>
        </fieldset>

        ${showAssoc
          ? html`
              <fieldset>
                <legend>Association Type</legend>
                <select name="associationType">
                  ${this.associationOptions.map(
                    opt => html`<option
                      value=${opt}
                      ?selected=${this.associationType === opt}
                    >
                      ${opt}
                    </option>`
                  )}
                </select>
              </fieldset>
            `
          : html`
              <fieldset>
                <legend>Scenario Type</legend>
                ${(['Valid', 'Valid - May not be accessible', 'Invalid'] as const).map(
                  type => html`
                    <label>
                      <input
                        type="radio"
                        name="scenarioType"
                        value=${type}
                        ?checked=${this.scenarioType === type}
                      />
                      ${type}
                    </label>`
                )}
              </fieldset>

              <fieldset>
                <legend>Select Scenario</legend>
                <select name="scenario">
                  ${this.scenarioOptions.map(
                    opt => html`<option
                      value=${opt}
                      ?selected=${this.scenario === opt}
                    >
                      ${opt}
                    </option>`
                  )}
                </select>
              </fieldset>
            `}
      </form>

      ${showAssoc
        ? this.renderAssociationTypes()
        : this.renderScenarioContent()}
    `;
  }
}

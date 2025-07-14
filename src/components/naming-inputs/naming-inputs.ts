import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ScenarioType = 'Valid' | 'Invalid';

type Scenario =
  // Valid
  | 'Shadow DOM Label and Input'
  | 'Light DOM Label with aria-labelledby'
  | 'Multiple Labels'
  // Invalid
  | 'Aria Labelledby from Light DOM'
  | 'Light DOM Label with Shadow Input'
  | 'Missing Input ID'
  | 'Label Without for'
  | 'Mismatched for and id';

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

@customElement('naming-inputs')
export class NamingInputs extends LitElement {
  @property({ type: String }) scenarioType: ScenarioType = 'Valid';
  @property({ type: String }) scenario: Scenario = 'Shadow DOM Label and Input';

  static styles = css`
  :host {
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        line-height: 1.5;
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
    mobile-input {
      --input-border: 2px solid #5941a9;
      --input-bg: #f9f5ff;
      --input-padding: 0.5rem;
      --input-radius: 6px;
    }
  `;

  private renderGivenName() {
    return html`
      <section>
        <h2>Shadow DOM Label and Input</h2>
        <p>This is a valid association inside the shadow root.</p>
        <given-name-input></given-name-input>
      </section>
    `;
  }

  private renderLightDomAriaLabelledby() {
    return html`
      <section>
        <h2>Light DOM Label with aria-labelledby</h2>
        <p>Input and label are both in light DOM using <code>aria-labelledby</code>.</p>
        <h3 id="labelLight">Your mobile</h3>
        <input type="tel" aria-labelledby="labelLight" />
      </section>
    `;
  }

  private renderMultipleLabels() {
    return html`
      <section>
        <h2>Multiple Labels</h2>
        <p>Two labels reference the same input. Valid but may cause duplicate announcements.</p>
        <label for="multi">Email Address</label>
        <label for="multi">Primary Email</label>
        <input type="email" id="multi" />
      </section>
    `;
  }

  private renderMobile() {
    return html`
      <section>
        <h2>Aria Labelledby from Light DOM</h2>
        <p>
          Input inside shadow DOM references light DOM label with
          <code>aria-labelledby</code>. ❌ Not valid — label is not exposed to accessibility tree.
        </p>
        <mobile-input></mobile-input>
      </section>
    `;
  }

  private renderEmail() {
    return html`
      <section>
        <h2>Light DOM Label with Shadow Input</h2>
        <p>Label <code>for</code> cannot reach input inside shadow DOM. Association is broken.</p>
        <label for="email">Email</label>
        <email-input></email-input>
      </section>
    `;
  }

  private renderMissingInputId() {
    return html`
      <section>
        <h2>Missing Input ID</h2>
        <p>Label uses <code>for</code>, but input has no <code>id</code>.</p>
        <label for="broken-id">Broken Label</label>
        <input type="text" />
      </section>
    `;
  }

  private renderLabelWithoutFor() {
    return html`
      <section>
        <h2>Label Without for</h2>
        <p>Input has <code>id</code>, but label is unassociated (no <code>for</code>).</p>
        <label>Unlinked Label</label>
        <input type="text" id="orphaned-input" />
      </section>
    `;
  }

  private renderMismatchedForAndId() {
    return html`
      <section>
        <h2>Mismatched for and id</h2>
        <p>Label <code>for="foo"</code> does not match input <code>id="bar"</code>.</p>
        <label for="foo">Email</label>
        <input type="email" id="bar" />
      </section>
    `;
  }

  render() {
    switch (this.scenario) {
      case 'Shadow DOM Label and Input':
        return this.renderGivenName();
      case 'Light DOM Label with aria-labelledby':
        return this.renderLightDomAriaLabelledby();
      case 'Multiple Labels':
        return this.renderMultipleLabels();
      case 'Aria Labelledby from Light DOM':
        return this.renderMobile();
      case 'Light DOM Label with Shadow Input':
        return this.renderEmail();
      case 'Missing Input ID':
        return this.renderMissingInputId();
      case 'Label Without for':
        return this.renderLabelWithoutFor();
      case 'Mismatched for and id':
        return this.renderMismatchedForAndId();
      default:
        return html`<p>Unknown scenario</p>`;
    }
  }
}
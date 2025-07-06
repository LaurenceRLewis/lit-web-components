import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("db-headings")
export class DbHeadings extends LitElement {
  @property({ type: String }) scenario:
    | "valid"
    | "missingH1"
    | "skippedLevels"
    | "multipleH1"
    | "notSemantic" = "valid";

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      line-height: 1.5;
      padding: 1rem;
    }

    section {
      margin-bottom: 2rem;
    }
    .fake-h1 {
      font-size: 2em;
      font-weight: bold;
      margin: 1.5rem 0 1rem;
    }

    .fake-h2 {
      font-size: 1.5em;
      font-weight: bold;
      margin: 1.25rem 0 1rem;
    }
  `;

  render() {
    return html`${this.renderScenario()}`;
  }

  private renderScenario() {
    switch (this.scenario) {
      case "missingH1":
        return html`
          <section>
            <h2>Page Title</h2>
            <p>
              No <code>&lt;h1&gt;</code> is used — violates structural
              expectations.
            </p>
          </section>
        `;
      case "skippedLevels":
        return html`
          <section>
            <h1>Main Title</h1>
            <h3>Subsection (Skipped h2)</h3>
            <h5>Details (Skipped h4)</h5>
          </section>
        `;
      case "multipleH1":
        return html`
          <section>
            <h1>Page Title</h1>
            <h1>Another Top-Level Heading</h1>
          </section>
        `;
      case "notSemantic":
        return html`
          <section>
            <div class="fake-h1" role="heading" aria-level="1">
              Styled as H1
            </div>
            <div class="fake-h2" role="heading" aria-level="2">
              Styled as H2
            </div>
          </section>
        `;
      default:
        return html`
          <section>
            <h1>Main Title</h1>
            <h2>Section</h2>
            <h3>Subsection</h3>
            <h4>Details</h4>
            <h5>More Info</h5>
            <h6>Fine Print</h6>
          </section>
        `;
    }
  }
}

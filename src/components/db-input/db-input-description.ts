import { html, TemplateResult } from 'lit';

export const InputDescription: TemplateResult = html`
  <style>
    .docs--wrapper {
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
      max-width: 720px;
      margin: 2rem auto;
    }

    h1 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.25rem;
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    th, td {
      padding: 0.5rem;
      border: 1px solid #ccc;
      text-align: left;
    }

    code {
      background: #f4f4f4;
      padding: 2px 4px;
      border-radius: 4px;
    }
  </style>

  <div class="docs--wrapper">
    <h1>&lt;db-form-input&gt; Testing Guide</h1>

    <p>
      This input component is designed for accessibility testing. It exposes props and slotted label options that simulate common
      form accessibility patterns — both valid and deliberately broken.
    </p>

    <p>
      You can provide a visible label using either:
    </p>
    <ul>
      <li><code>labelText</code> — sets an internal fallback label if no slotted label is present</li>
      <li><code>&lt;label slot="label"&gt;</code> — projected into the component for full semantic control</li>
    </ul>

    <h2>Props for Testing</h2>
    <table>
      <thead>
        <tr><th>Prop</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>labelText</code></td>
          <td>The visible text fallback for the <code>&lt;label&gt;</code> element. Ignored if a slotted label is provided.</td>
        </tr>
        <tr>
          <td><code>ariaLabel</code></td>
          <td>Optional <code>aria-label</code> on the input. Use to test screen reader fallback labeling.</td>
        </tr>
        <tr>
          <td><code>inputType</code></td>
          <td>HTML input type (<code>text</code>, <code>email</code>, <code>tel</code>, <code>url</code>).</td>
        </tr>
        <tr>
          <td><code>autoComplete</code></td>
          <td>Applies a WAI-compliant <code>autocomplete</code> value, or leave blank to omit.</td>
        </tr>
        <tr>
          <td><code>inputId</code></td>
          <td>Unique ID applied to the input and used for label association when <code>for</code> is used in a slotted label.</td>
        </tr>
      </tbody>
    </table>

    <h2>Expected Violations</h2>
    <table>
      <thead>
        <tr><th>Scenario</th><th>Expected Issue</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>No <code>labelText</code> and no slotted label; <code>ariaLabel</code> also blank</td>
          <td><strong>Failure</strong>: Missing accessible name</td>
        </tr>
        <tr>
          <td>Slotted label exists but <code>for</code> doesn't match <code>inputId</code></td>
          <td><strong>Failure</strong>: Label not associated with input</td>
        </tr>
        <tr>
          <td><code>ariaLabel</code> used with no visual label</td>
          <td><strong>Warning</strong>: Valid but may be flagged if visible label expected</td>
        </tr>
        <tr>
          <td><code>autoComplete</code> left blank</td>
          <td><strong>Warning</strong>: Missing form autofill hint</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

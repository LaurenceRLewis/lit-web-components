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
    <h1>&lt;db-form-input&gt; Accessibility Testing Component</h1>

    <p>
      This input component is used to simulate common accessibility patterns and failures. Each preset represents a different
      input/label configuration used to test automated tools and screen readers.
    </p>

    <p>
      A label may be provided by:
    </p>
    <ul>
      <li><code>labelText</code>: rendered as a fallback <code>&lt;label&gt;</code> if no slotted label exists</li>
      <li><code>&lt;label slot="label"&gt;</code>: projected into the shadow DOM for full semantic control</li>
    </ul>

    <h2>Props for Accessibility Testing</h2>
    <table>
      <thead>
        <tr><th>Prop</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>preset</code></td>
          <td>Applies a predefined configuration to test accessibility validation behavior</td>
        </tr>
        <tr>
          <td><code>labelText</code></td>
          <td>Fallback visible label. Only used if no <code>slot="label"</code> content is passed in.</td>
        </tr>
        <tr>
          <td><code>ariaLabel</code></td>
          <td>Applies <code>aria-label</code> to the input for testing non-visible labeling</td>
        </tr>
        <tr>
          <td><code>inputType</code></td>
          <td>Standard HTML input type: <code>text</code>, <code>email</code>, <code>tel</code>, <code>url</code></td>
        </tr>
        <tr>
          <td><code>autoComplete</code></td>
          <td>Sets the WAI-supported <code>autocomplete</code> token for the input</td>
        </tr>
        <tr>
          <td><code>inputId</code></td>
          <td>Unique ID used for <code>for=</code> binding when a label is provided</td>
        </tr>
      </tbody>
    </table>

    <h2>Expected Accessibility Issues</h2>
    <table>
      <thead>
        <tr><th>Scenario</th><th>Expected Outcome</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>No label, no <code>aria-label</code></td>
          <td><strong>Failure</strong>: Input lacks accessible name</td>
        </tr>
        <tr>
          <td><code>for</code> doesn't match <code>inputId</code></td>
          <td><strong>Failure</strong>: Label not associated with input</td>
        </tr>
        <tr>
          <td>Only <code>aria-label</code> used</td>
          <td><strong>Warning</strong>: Functional, but invisible to sighted users</td>
        </tr>
        <tr>
          <td>Missing <code>autocomplete</code></td>
          <td><strong>Warning</strong>: Autofill hint missing (may be flagged)</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

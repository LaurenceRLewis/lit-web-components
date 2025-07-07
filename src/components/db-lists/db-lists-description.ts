import { html, TemplateResult } from "lit";

export const ListDescription: TemplateResult = html`
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
    <h1>&lt;db-lists&gt; Testing Guide</h1>

    <p>
      This component helps test HTML list structures and their impact on accessibility.
      You can toggle between valid and invalid scenarios to evaluate how automated
      tools respond to broken or malformed list markup.
    </p>

    <h2>Props</h2>
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>scenario</code></td>
          <td>
            Selects the test case to apply, including valid list rendering and deliberately broken structures.
          </td>
        </tr>
        <tr>
          <td><code>listType</code></td>
          <td>
            Defines whether the base list should be a <code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code>.
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Scenarios</h2>
    <table>
      <thead>
        <tr>
          <th>Scenario</th>
          <th>Expected Issue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Default</code></td>
          <td>Renders a valid static list of car brands</td>
        </tr>
        <tr>
          <td><code>Slot Items</code></td>
          <td>Projects <code>&lt;li&gt;</code> elements via <code>&lt;slot&gt;</code></td>
        </tr>
        <tr>
          <td><code>Replace list with &lt;div&gt;</code></td>
          <td><strong>Failure</strong>: Invalid parent container with no list role</td>
        </tr>
        <tr>
          <td><code>Missing opening tag</code></td>
          <td><strong>Failure</strong>: Items appear in markup but not within a list structure</td>
        </tr>
        <tr>
          <td><code>Missing closing tag</code></td>
          <td><strong>Failure</strong>: Truncated markup can break accessibility tree parsing</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

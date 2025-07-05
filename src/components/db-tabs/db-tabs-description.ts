import { html, TemplateResult } from "lit";

export const TabsDescription: TemplateResult = html`
  <style>
    .docs--wrapper {
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }

    h2 {
      font-size: 1.25rem;
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin-top: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    th,
    td {
      padding: 0.5rem;
      border: 1px solid #ccc;
      text-align: left;
    }

    code {
      font-family: monospace;
      background: #f4f4f4;
      padding: 0 3px;
    }
  </style>

  <div class="docs--wrapper">
    <h2>Automated Testing Notes</h2>
    <p>
      This component allows for the deliberate configuration of invalid ARIA
      states to test automated tools. Use the combinations below to trigger
      expected rule violations.
    </p>

    <h2>Props</h2>
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>tabAttributeMode</code></td>
          <td>
            <code>"aria-selected" | "aria-expanded" | "aria-chosen"</code>
          </td>
          <td>
            Sets the ARIA attribute on each tab. Invalid values simulate ARIA
            misuse.
          </td>
        </tr>
        <tr>
          <td><code>tabPanelRole</code></td>
          <td><code>"tabpanel" | "region" | ""</code></td>
          <td>
            Sets the role of each tab panel. Empty value removes role entirely.
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Examples That Should Fail Testing</h2>
    <table>
      <thead>
        <tr>
          <th>tabAttributeMode</th>
          <th>tabPanelRole</th>
          <th>Expected Violations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>"aria-expanded"</code></td>
          <td><code>"tabpanel"</code></td>
          <td>
            <ul>
              <li>
                <code>aria-expanded</code> used on element with
                <code>role="tab"</code> — not allowed
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><code>"aria-chosen"</code></td>
          <td><code>"region"</code></td>
          <td>
            <ul>
              <li><code>aria-chosen</code> is not a valid ARIA attribute</li>
              <li>
                <code>role="region"</code> is not correct in a tabs pattern
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><code>"aria-selected"</code></td>
          <td><code>""</code> (empty string)</td>
          <td>
            <ul>
              <li>Tab panel missing required <code>role</code></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td><code>"aria-chosen"</code></td>
          <td><code>""</code></td>
          <td>
            <ul>
              <li>Invalid ARIA attribute on tab</li>
              <li>No role on tab panel</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`;

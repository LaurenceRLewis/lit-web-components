import { html, TemplateResult } from 'lit';

export const ShadowBoundariesDescription: TemplateResult = html`
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

    h3 {
      font-size: 1rem;
      margin-top: 1.5rem;
      margin-bottom: 0.25rem;
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
      background: #f4f4f4;
      padding: 2px 4px;
      border-radius: 4px;
    }
  </style>

  <div class="docs--wrapper">
    <h1>&lt;shadow-boundaries&gt; Accessible Naming Techniques</h1>

    <p>
      The <code>&lt;shadow-boundaries&gt;</code> component demonstrates how to apply accessible names to an input inside a
      Shadow DOM using three techniques. It ensures that a <strong>visible label is always rendered</strong>,
      regardless of the method used.
    </p>

    <h2>Supported Naming Techniques</h2>
    <ul>
      <li>
        <strong>Slotted Label with <code>for</code></strong>: A visible <code>&lt;label slot="label"&gt;</code> is projected into the component and associated using <code>for</code>/<code>id</code>.
      </li>
      <li>
        <strong><code>aria-labelledby</code></strong>: A visible external element is referenced by ID to provide the accessible name.
      </li>
      <li>
        <strong><code>aria-label</code></strong>: A string is passed as a prop and used both as the programmatic label and a visible fallback.
      </li>
    </ul>

    <h2>Example: Slotted Label</h2>
    <p>The simplest and most semantic option:</p>
    <pre><code>
&lt;label slot="label" for="input-cross-shadow"&gt;Full name&lt;/label&gt;
&lt;shadow-boundaries inputId="input-cross-shadow"&gt;&lt;/shadow-boundaries&gt;
    </code></pre>

    <h2>Example: aria-labelledby</h2>
    <p>Use an external visible element referenced by ID:</p>
    <pre><code>
&lt;span id="external-label-id"&gt;Full name&lt;/span&gt;
&lt;shadow-boundaries
  inputId="input-cross-shadow"
  labelledById="external-label-id"
&gt;&lt;/shadow-boundaries&gt;
    </code></pre>

    <h2>Example: aria-label with Fallback</h2>
    <p>Pass a string that will be applied as <code>aria-label</code> and also rendered visibly inside the component:</p>
    <pre><code>
&lt;shadow-boundaries
  inputId="input-cross-shadow"
  ariaLabel="Full name"
&gt;&lt;/shadow-boundaries&gt;
    </code></pre>

    <h2>Component Behavior</h2>
    <ul>
      <li>✅ A visible label is <strong>always rendered</strong>, even for <code>aria-label</code> or <code>aria-labelledby</code></li>
      <li>✅ Native HTML <code>&lt;label for&gt;</code> works via the <code>slot="label"</code></li>
      <li>✅ Fallback label is visually styled and readable by screen readers</li>
    </ul>

    <h2>Keyboard and Focus</h2>
    <ul>
      <li>Tab navigation correctly enters the input</li>
      <li>The input is always focusable regardless of naming method</li>
      <li>The visible fallback label does not interfere with keyboard or screen reader navigation</li>
    </ul>

    <h2>Technique Comparison</h2>
    <table>
      <thead>
        <tr>
          <th>Technique</th>
          <th>Visible Label</th>
          <th>Programmatic Name</th>
          <th>When to Use</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Slotted label + for/id</td>
          <td>✅</td>
          <td>✅</td>
          <td>Preferred when label is part of the light DOM</td>
        </tr>
        <tr>
          <td>aria-labelledby</td>
          <td>✅ (external element)</td>
          <td>✅</td>
          <td>When projecting the label isn't feasible</td>
        </tr>
        <tr>
          <td>aria-label</td>
          <td>✅ (fallback rendered)</td>
          <td>✅</td>
          <td>When label text must come from a string prop</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

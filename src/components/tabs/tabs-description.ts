import { html, TemplateResult } from 'lit';

export const TabsDescription: TemplateResult = html`
  <style>
    .docs--wrapper {
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        line-height: 1.5;
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

    th,
    td {
      padding: 0.5rem;
      border: 1px solid #ccc;
      text-align: left;
    }

    kbd {
      background-color: #eee;
      border: 1px solid #aaa;
      border-radius: 3px;
      padding: 2px 4px;
      font-size: 90%;
      font-family: monospace;
    }
  </style>

  <div class="docs--wrapper">
    <h1>Tabs Web Component</h1>
    <p>
      The <strong>TabsAccordion</strong> widget is a sophisticated component developed in Lit that displays content in a tabular or accordion view depending on the viewport size.
    </p>

    <h2>Features</h2>
    <ul>
      <li>Responsive: switches from tabs to accordion below a threshold.</li>
      <li>Custom colors for text and tab background.</li>
      <li>Keyboard navigation support.</li>
      <li>Activation mode: manual or automated.</li>
      <li>Pass tab content as an array of objects with <code>id</code>, <code>title</code>, and <code>content</code>.</li>
    </ul>

    <h2>Keyboard Accessibility</h2>
    <ul>
      <li><kbd>Enter</kbd> / <kbd>Space</kbd> — toggle or activate tab/accordion</li>
      <li><kbd>Arrow Right</kbd> / <kbd>Arrow Left</kbd> — move focus between tabs</li>
      <li><kbd>Home</kbd> — focus first tab</li>
      <li><kbd>End</kbd> — focus last tab</li>
    </ul>

    <h2>Props</h2>
    <table>
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>tabs</code></td><td><code>Array</code></td><td>Tab config array with id, title, and content.</td></tr>
        <tr><td><code>tabPanelTabindex</code></td><td><code>boolean</code></td><td>Whether the tabpanel is focusable.</td></tr>
        <tr><td><code>triggerActivation</code></td><td><code>"manual" | "automated"</code></td><td>How tabs are activated.</td></tr>
        <tr><td><code>textColor</code></td><td><code>string</code></td><td>Color applied to tab text.</td></tr>
        <tr><td><code>tabBackground</code></td><td><code>{ default, selected }</code></td><td>Background color for default and selected tab.</td></tr>
        <tr><td><code>viewportThreshold</code></td><td><code>number</code></td><td>Switch point to accordion view.</td></tr>
      </tbody>
    </table>

    <h2>Methods</h2>
    <table>
      <thead>
        <tr><th>Method</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>handleKeyDown</code></td><td>Handles keydown events for navigation/activation.</td></tr>
        <tr><td><code>updateViewMode</code></td><td>Triggers view switch between tab and accordion.</td></tr>
      </tbody>
    </table>
  </div>
`;

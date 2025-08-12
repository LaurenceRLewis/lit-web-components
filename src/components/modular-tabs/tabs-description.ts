//tabs-description.ts
import { html, TemplateResult } from "lit";

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
    <h1>Modular Tabs Web Component</h1>
    <p>Testing thus far has identified accessibility gaps in modularising a Tab component</p>
    <p>
      The <strong>ModularTabs</strong> system is a composable, accessible tab
      interface built with Lit. It consists of smaller building
      blocks—<code>&lt;modular-tab-list&gt;</code>,
      <code>&lt;modular-tab&gt;</code>, and
      <code>&lt;modular-tab-panel&gt;</code>—that communicate via events and
      slots.
    </p>
    <p>
      Content and structure are passed via <code>tabs</code> data or composed
      manually using <code>&lt;slot&gt;</code> distribution. Each piece can be
      individually styled, reused, or extended while maintaining full ARIA
      compliance.
    </p>

    <h2>Features</h2>
    <ul>
      <li>
        Fully modular: each part is encapsulated in its own custom element.
      </li>
      <li>
        Slot-based: tab and panel content is distributed using
        <code>&lt;slot&gt;</code>.
      </li>
      <li>
        Responsive: switches from tabs to accordion view below a defined
        threshold.
      </li>
      <li>
        Customizable: colors and activation behavior are easily configured via
        props.
      </li>
      <li>
        Accessible: follows ARIA Tab guidelines and includes keyboard support.
      </li>
    </ul>

    <h2>Keyboard Accessibility</h2>
    <ul>
      <li><kbd>Tab</kbd> — moves between tab and panel</li>
      <li>
        <kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd> — move focus across tabs
      </li>
      <li><kbd>Home</kbd> / <kbd>End</kbd> — jump to first or last tab</li>
      <li>
        <kbd>Enter</kbd> / <kbd>Space</kbd> — activate a tab (manual mode)
      </li>
      <li>In automated mode, focusing a tab will activate it automatically.</li>
    </ul>

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
          <td><code>triggerActivation</code></td>
          <td><code>"manual" | "automated"</code></td>
          <td>How tabs are activated—on click or on focus.</td>
        </tr>
        <tr>
          <td><code>viewportThreshold</code></td>
          <td><code>number</code></td>
          <td>Width breakpoint (in px) where layout switches to accordion.</td>
        </tr>
      </tbody>
    </table>

    <h2>Component Slots</h2>
    <ul>
      <li>
        <code>&lt;modular-tab-list&gt;</code> — Hosts
        <code>&lt;modular-tab&gt;</code> elements via <code>&lt;slot&gt;</code>.
      </li>
      <li>
        <code>&lt;modular-tab-panel&gt;</code> — Displays tab content through a
        slotted area.
      </li>
    </ul>

    <h2>Events</h2>
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>tab-selected</code></td>
          <td>
            Fired from <code>modular-tab</code> on click/focus to notify parent
            of tab change.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`;

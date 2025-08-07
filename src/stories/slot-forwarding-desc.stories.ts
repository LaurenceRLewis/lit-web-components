import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta = {
  title: "Docs/About Slot",
  parameters: {
    docsOnly: true,
    controls: { hideNoControlsWarning: true },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const AboutSlot: StoryObj = {
  render: () => html`
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

      pre {
        background: #f4f4f4;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
      }
    </style>

    <div class="docs--wrapper">
      <h1>&lt;slot&gt; and Slot Forwarding in Shadow DOM</h1>

      <p>
        This document explains how the <code>&lt;slot&gt;</code> element works
        inside Web Components and how to forward slotted content across multiple
        shadow roots.
      </p>

      <h2>Accessibility Considerations for Slot Naming Across Boundaries</h2>

      <p>
        When slotted content is used to provide accessible names or labels for
        form controls, special care must be taken to ensure these relationships
        are still reflected correctly in the accessibility tree. Standard
        <code>&lt;label for&gt;</code> relationships will
        <strong>not</strong> work across shadow boundaries.
      </p>

      <h3>Supported Naming Techniques</h3>
      <ul>
        <li>
          ✅ <code>aria-labelledby</code>: Preferred method to associate a
          visible label slotted into a shadow root
        </li>
        <li>
          ✅ <code>aria-label</code>: Can be used as a fallback, especially when
          text is visually visible but not semantically associated
        </li>
        <li>
          ❌ <code>label for</code>: Not supported across Shadow DOM boundaries
          due to scoping restrictions
        </li>
      </ul>

      <p>
        Assistive technologies may not always follow ID references across shadow
        roots consistently, so using <code>aria-labelledby</code> with forwarded
        slots is recommended when associating slotted text with an input control
        inside a nested component.
      </p>

      <h2>Basic Usage</h2>
      <pre><code>
&lt;my-element&gt;
  &lt;p&gt;Hello!&lt;/p&gt;
&lt;/my-element&gt;

class MyElement extends LitElement {
  render() {
    return html\`&lt;slot&gt;&lt;/slot&gt;\`;
  }
}
      </code></pre>

      <h2>Named Slots</h2>
      <pre><code>
&lt;my-element&gt;
  &lt;h1 slot="title"&gt;Heading&lt;/h1&gt;
  &lt;p slot="content"&gt;Body text&lt;/p&gt;
&lt;/my-element&gt;

class MyElement extends LitElement {
  render() {
    return html\`
      &lt;slot name="title"&gt;&lt;/slot&gt;
      &lt;slot name="content"&gt;&lt;/slot&gt;
    \`;
  }
}
      </code></pre>

      <h2>What Can Be Slotted?</h2>
      <ul>
        <li>✅ Text nodes</li>
        <li>
          ✅ HTML elements (e.g., <code>&lt;div&gt;</code>,
          <code>&lt;img&gt;</code>)
        </li>
        <li>✅ Custom elements</li>
        <li>✅ Fallback content inside the slot</li>
        <li>
          ❌ Content cannot be slotted from one shadow root to another
          automatically
        </li>
      </ul>

      <h2>Slot Forwarding Across Shadow Roots</h2>
      <p>
        To pass content through nested Web Components, slot forwarding is
        required:
      </p>
      <ol>
        <li>Light DOM provides <code>slot="forward-label"</code></li>
        <li>
          <code>&lt;outer-element&gt;</code> re-slots it using
          <code>slot="label"</code>
        </li>
        <li>
          <code>&lt;inner-element&gt;</code> renders it using
          <code>&lt;slot name="label"&gt;</code>
        </li>
      </ol>

      <h2>Accessibility and Assistive Technology</h2>
      <ul>
        <li>
          ✅ Slotted content appears in the accessibility tree at its original
          position
        </li>
        <li>
          ⚠️ <code>label[for]</code> will not work if label and input are in
          different shadow roots
        </li>
        <li>
          ✅ Use <code>aria-labelledby</code> to bridge the gap when needed
        </li>
      </ul>

      <pre><code>
&lt;label id="label-text" slot="forward-label"&gt;First name&lt;/label&gt;
&lt;input id="shared-id" aria-labelledby="label-text" /&gt;
      </code></pre>

      <h2>Browser Support (2025)</h2>
      <table>
        <thead>
          <tr>
            <th>Browser</th>
            <th>Slot Support</th>
            <th>Cross-Shadow Labelling</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chrome</td>
            <td>✅</td>
            <td>⚠️ Limited; <code>aria-labelledby</code> preferred</td>
          </tr>
          <tr>
            <td>Firefox</td>
            <td>✅</td>
            <td>❌ <code>label[for]</code> across boundaries not supported</td>
          </tr>
          <tr>
            <td>Safari</td>
            <td>✅</td>
            <td>⚠️ Inconsistent across versions</td>
          </tr>
        </tbody>
      </table>

      <h2>Keyboard Focus</h2>
      <ul>
        <li>✅ Tab and Shift+Tab support for slotted interactive elements</li>
        <li>✅ Inputs inside slots receive focus naturally</li>
        <li>
          ⚠️ When forwarding through multiple slots, ensure visual rendering
          stays synchronised with the DOM
        </li>
      </ul>

      <h2>Slot Behaviour Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Supported?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Light DOM → Shadow DOM slot</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Shadow DOM → Shadow DOM slot</td>
            <td>❌ No</td>
          </tr>
          <tr>
            <td>Manual slot forwarding</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td><code>for</code>/<code>id</code> label across roots</td>
            <td>⚠️ Limited</td>
          </tr>
          <tr>
            <td><code>aria-labelledby</code> fallback</td>
            <td>✅ Recommended</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};

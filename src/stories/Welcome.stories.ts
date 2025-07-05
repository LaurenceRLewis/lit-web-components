// src/stories/Welcome.stories.ts
import { html } from 'lit';
import type { Meta } from '@storybook/web-components';

export default {
  title: 'Welcome/Overview',
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export const Overview = {
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
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h2 {
        font-size: 1.25rem;
        margin-top: 2rem;
        margin-bottom: 0.5rem;
      }

      p {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      pre {
        background: #f4f4f4;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
      }

      code {
        font-family: monospace;
      }
    </style>

    <div class="docs--wrapper">
      <h1>Accessible Web Components Library</h1>
      <p>
        This Storybook showcases a series of deliberately broken and standards-compliant web components built using the <strong>Lit</strong> framework.
      </p>
      <p>
        Components in this library are designed for testing and demonstration purposes, including:
      </p>
      <ul>
        <li>ARIA attribute misuse (e.g. <code>aria-chosen</code>)</li>
        <li>Missing or invalid <code>role</code> and <code>aria-labelledby</code> combinations</li>
        <li>Accessible name computation failures</li>
        <li>Correct and incorrect <code>autocomplete</code> patterns</li>
      </ul>
      <p>
        Each component is a true <strong>Web Component</strong>, using Shadow DOM, scoped styling, and standard property binding. The Storybook props panel allows you to toggle between valid and invalid configurations for accessibility evaluation tools.
      </p>
      <p>
        Use this environment to test against automation tools.
      </p>

      <h2>Using <code>&lt;slot&gt;</code> in Web Components</h2>

      <p>
        The <strong>Input</strong> component in this library uses the <code>&lt;slot&gt;</code> element to enable accessible and flexible content projection. Specifically, it exposes a <code>slot="label"</code> so that developers can provide their own <code>&lt;label&gt;</code> element in the light DOM, while the native <code>&lt;input&gt;</code> remains in the Shadow DOM.
      </p>

      <p>This approach supports:</p>
      <ul>
        <li>Accessible name computation through standard <code>for</code>/<code>id</code> associations</li>
        <li>True semantic representation in developer tools and assistive technologies</li>
        <li>Design flexibility by allowing custom layout or heading structures inside the slotted label</li>
      </ul>

      <p>Example usage:</p>
      <pre><code>&lt;db-form-input input-id="custom123"&gt;
  &lt;label slot="label" for="custom123"&gt;Email address&lt;/label&gt;
&lt;/db-form-input&gt;
</code></pre>

      <p>
        This allows the input to remain fully encapsulated inside the component, while the label remains in the light DOM and accessible to screen readers — with no need for hardcoded <code>aria-label</code> values or inflexible markup inside the component itself.
      </p>

      <p>
        This slotting technique ensures accessible naming, DOM clarity, and reusability — key goals in Web Component development.
      </p>
    </div>
  `,
};
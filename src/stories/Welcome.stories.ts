// src/stories/Welcome.stories.ts
import { html } from 'lit';
import type { Meta } from '@storybook/web-components';

export default {
  title: 'Welcome/Introduction',
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export const Introduction = {
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
        This Storybook showcases a set of intentionally broken Web Components built using the <strong>Lit</strong> framework. This library is not intended for use in production. The purpose is to learn about web components and the accessibility gaps.
      </p>
      <p>
        Each component supports <strong>test scenarios</strong> that simulate accessibility issues commonly flagged by automated tools or missed during manual QA, including:
      </p>
      <ul>
        <li>Incorrect or unsupported ARIA attributes (e.g. <code>aria-chosen</code>)</li>
        <li>Missing <code>role</code> values for critical landmarks or interactive widgets</li>
        <li>Invalid or broken <code>aria-labelledby</code> and <code>aria-controls</code> relationships</li>
        <li>Autofill and name computation issues caused by missing <code>autocomplete</code> or improper label association</li>
        <li>Structural issues like missing or malformed list markup (<code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>)</li>
      </ul>
      <p>
        All components use <strong>Shadow DOM</strong> and scoped styles. Many expose <code>&lt;slot&gt;</code> elements to allow flexible light DOM projection while maintaining accessibility integrity.
      </p>

      <h2>Why Web Components Use Both Light DOM and Shadow DOM</h2>

      <p>
        Web Components rely on both <strong>Light DOM</strong> and <strong>Shadow DOM</strong> to combine flexibility with encapsulation.
      </p>
      <ul>
        <li>
          <strong>Shadow DOM</strong> enables style and structure isolation, protecting internal markup from outside interference and preventing style leaks.
        </li>
        <li>
          <strong>Light DOM</strong> allows developers to inject custom content into a component using <code>&lt;slot&gt;</code>, enabling semantic, accessible markup and custom user-facing labels.
        </li>
      </ul>
      <p>
        For example, a component might render a native <code>&lt;dialog&gt;</code> and apply scoped styling internally using Shadow DOM, while projecting user-defined paragraphs or headings into a slot from the light DOM.
      </p>

      <p><strong>The <code>&lt;slot&gt;</code> element bridges these two worlds.</strong> It allows content passed into the light DOM to be rendered in a specific location inside the shadow DOM without breaking encapsulation.</p>

      <p>
        This approach makes components both reusable and accessible, while avoiding the limitations of inline-only content or tightly-coupled markup.
      </p>

      <h2>Using <code>&lt;slot&gt;</code> for Accessible Naming</h2>

      <p>
        The <strong>db-form-input</strong> component uses a named slot (<code>slot="label"</code>) to allow you to inject a visible label from the light DOM. This enables:
      </p>
      <ul>
        <li>Use of standard <code>&lt;label for&gt;</code> syntax</li>
        <li>Fully accessible name computation without relying on <code>aria-label</code></li>
        <li>Custom layout or heading placement for screen reader structure</li>
      </ul>

      <p>Example usage:</p>
      <pre><code>&lt;db-form-input input-id="custom123"&gt;
  &lt;label slot="label" for="custom123"&gt;Email address&lt;/label&gt;
&lt;/db-form-input&gt;
</code></pre>

      <h2>Testing Tab and List Structures</h2>

      <p>
        Components like <strong>db-wc-tabs</strong> and <strong>db-lists</strong> allow simulation of broken roles, invalid attribute combinations, or misused markup:
      </p>
      <ul>
        <li><strong>Tabs:</strong> Remove <code>role="tab"</code> or <code>aria-controls</code> from one or more buttons</li>
        <li><strong>Lists:</strong> Replace a semantic list with a <code>&lt;div&gt;</code>, omit the opening or closing tag, or supply <code>&lt;li&gt;</code> elements via slot</li>
      </ul>

      <p>
        The goal of this Storybook is to create a controlled environment for verifying how well accessibility testing tools detect real-world markup mistakes.
      </p>

      <p>
        Use the "Test Scenario" dropdown in each component to toggle between valid output and known accessibility failures.
      </p>
      <p><a href="https://github.com/LaurenceRLewis/lit-web-components">lit-web-components Github repro</a></p>
    </div>
  `,
};

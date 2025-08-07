import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta = {
  title: "Docs/About Web Components",
  parameters: {
    docsOnly: true,
    controls: { hideNoControlsWarning: true },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const AboutWebComponents: StoryObj = {
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

      ul, ol {
        margin-left: 1.5rem;
        margin-top: 0.5rem;
      }

      code {
        background: #f4f4f4;
        padding: 2px 4px;
        border-radius: 4px;
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
    </style>

    <div class="docs--wrapper">
      <h1>Web Components Overview</h1>

      <p>
        Web Components are a set of standardised technologies that enable the
        creation of custom, reusable, and encapsulated HTML elements. These are
        supported natively in all modern browsers and are defined by the HTML
        Living Standard.
      </p>

      <h2>Core Specifications</h2>
      <ul>
        <li><strong>Custom Elements</strong>: Define custom tags with JavaScript classes</li>
        <li><strong>Shadow DOM</strong>: Encapsulation of DOM and styles</li>
        <li><strong>HTML Templates</strong>: Use <code>&lt;template&gt;</code> and <code>&lt;slot&gt;</code> for structure</li>
        <li><strong>ES Modules</strong>: Native module support for component reuse</li>
      </ul>

      <h2>Historical Timeline</h2>
      <h3>2011–2013: Early Proposals</h3>
      <ul>
        <li>Google proposes initial specs (Shadow DOM v0, Custom Elements v0)</li>
        <li>Early support via Chrome experiments</li>
      </ul>

      <h3>2014–2016: Polymer & Polyfills</h3>
      <ul>
        <li>Google launches Polymer to explore usage and adoption</li>
        <li>Polyfills patch support for browsers lacking native APIs</li>
      </ul>

      <h3>2016–2018: Specification Stabilisation</h3>
      <ul>
        <li>Custom Elements v1 and Shadow DOM v1 become W3C/WHATWG standards</li>
        <li>Browsers adopt v1 spec: Chrome, Firefox, Edge, Safari</li>
      </ul>

      <h3>2019–2023: Adoption and Libraries</h3>
      <ul>
        <li>Lit, Stencil, FAST emerge to simplify component authoring</li>
        <li>Growing use in design systems and embedded widgets</li>
      </ul>

      <h3>2024–2025: Modern Use</h3>
      <ul>
        <li>Web Components are stable, cross-framework, widely supported</li>
        <li>Design systems (Adobe Spectrum, FAST, Shoelace) use them heavily</li>
      </ul>

      <h2>Benefits</h2>
      <ul>
        <li>Framework-agnostic reuse</li>
        <li>Native encapsulation of DOM and styles</li>
        <li>Easy distribution via ES modules</li>
      </ul>

      <h2>Challenges</h2>
      <ul>
        <li>Accessibility must be implemented manually</li>
        <li>Scoped styles can interfere with global CSS or theming</li>
        <li>Interop issues with older frameworks</li>
      </ul>

      <h2>Standard References</h2>
      <ul>
        <li><a href="https://html.spec.whatwg.org/multipage/custom-elements.html">HTML Living Standard – Custom Elements</a></li>
        <li><a href="https://html.spec.whatwg.org/multipage/scripting.html#shadow-trees">HTML Living Standard – Shadow DOM</a></li>
        <li><a href="https://html.spec.whatwg.org/multipage/scripting.html#the-template-element">HTML Living Standard – Template Element</a></li>
      </ul>
    </div>
  `,
};

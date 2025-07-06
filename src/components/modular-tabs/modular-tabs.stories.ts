import "./index.js";
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { TabsDescription } from "./tabs-description.js";

export default {
  title: "Modular Components/Modular Tabs",
  component: "modular-tabs",
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
    docs: {
      source: { type: "code" },
    },
  },
  argTypes: {
    triggerActivation: {
      name: "Manual or automated activation",
      control: { type: "select" },
      options: ["automated", "manual"],
    },
    viewportThreshold: {
      name: "Viewport switch threshold (px)",
      control: { type: "number" },
      defaultValue: 400,
    },
    tabs: { table: { disable: true } },
  },
} satisfies Meta;

export const ResponsiveTabs: StoryObj = {
  args: {
    triggerActivation: "automated",
    viewportThreshold: 400,
    tabs: [
      {
        id: "html-009878",
        title: "HTML",
        content: html`
          <h3>About HTML & Accessibility</h3>
          <p>
            HTML is the foundation of accessible, semantic content. Using
            appropriate tags enables both human and machine readability,
            improves SEO, and supports assistive technology.
          </p>
        `,
      },
      {
        id: "aria-009878",
        title: "ARIA",
        content: html`
          <h3>About ARIA & Accessibility</h3>
          <p>
            ARIA enhances accessibility by providing semantic meaning to dynamic interfaces.
          </p>
        `,
      },
      {
        id: "webcomponents-009878",
        title: "Web Components",
        content: html`
          <h3>About Web Components & Accessibility</h3>
          <p>
            Web Components are encapsulated UI primitives using Shadow DOM and custom elements.
          </p>
        `,
      },
    ],
  },
};

export const Docs = {
  render: () => TabsDescription,
  parameters: {
    docsOnly: true,
  },
};

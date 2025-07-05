import "./db-tabs";
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { TabsDescription } from "./db-tabs-description";

export default {
  title: "Deliberately broken for testing/Tabs",
  component: "db-wc-tabs",
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    // tabPanelTabindex: {
    //   name: "Add tabindex 0 to Tabpanel",
    //   control: { type: "boolean" },
    // },
    // textColor: {
    //   name: "Tab text colours",
    //   control: { type: "object" },
    //   description: "Set default and selected tab text colors.",
    // },
    // tabBackground: {
    //   name: "Tab background colours",
    //   control: { type: "object" },
    //   description: "Set default and selected tab background colors.",
    // },
    // viewportThreshold: {
    //   name: "Viewport switch threshold (px)",
    //   control: { type: "number" },
    //   description: "Width at which layout switches to accordion.",
    // },
    tabAttributeMode: {
      name: "Tab ARIA Attribute",
      control: { type: "select" },
      options: ["aria-selected", "aria-expanded", "aria-chosen"],
      description: "Applies valid or invalid ARIA attributes to tabs.",
    },
    tabPanelRole: {
      name: "Tab panel role",
      control: { type: "select" },
      options: ["tabpanel", "region", ""],
      description: "Testing valid, invalid or no role on tabpanel container. Set the role of each tab panel. Leave blank to simulate a missing role.",
    },
    tabs: {
      table: { disable: true },
    },
  },
} satisfies Meta;

export const ResponsiveTabs: StoryObj = {
  args: {
    tabAttributeMode: "aria-selected",
    tabPanelRole: "tabpanel",
    // tabPanelTabindex: true,
    textColor: {
      default: "rgba(0, 0, 0, 1)",
      selected: "rgba(255, 255, 255, 1)",
    },
    tabBackground: {
      default: "rgba(209, 203, 219, 1)",
      selected: "rgba(156, 39, 176, 1)",
    },
    // viewportThreshold: 400,
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
            ARIA (Accessible Rich Internet Applications) enhances web
            accessibility by providing semantic meaning to dynamic interfaces.
          </p>
        `,
      },
      {
        id: "webcomponents-009878",
        title: "Web Components",
        content: html`
          <h3>About Web Components & Accessibility</h3>
          <p>
            Web Components enable encapsulated UI elements with Shadow DOM,
            allowing teams to create reusable, framework-agnostic widgets.
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

import "./db-tabs";
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { TabsDescription } from "./db-tabs-description";

const defaultTabs = [
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
];

export default {
  title: "Deliberately broken for testing/Tabs",
  component: "db-wc-tabs",
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    tabAttributeMode: {
      name: "Tab ARIA Attribute",
      control: { type: "select" },
      options: ["aria-selected", "aria-expanded", "aria-chosen"],
      description: "Applies valid or invalid ARIA attributes to tabs.",
    },
    triggerActivation: {
      name: "Trigger Activation",
      control: { type: "select" },
      options: ["manual", "automated"],
      description: "Switch between manual or automated tab activation on focus.",
    },
    tabPanelRole: {
      name: "Tab panel role",
      control: { type: "select" },
      options: ["tabpanel", "region", ""],
      description:
        "Testing valid, invalid or no role on tabpanel container. Leave blank to simulate a missing role.",
    },
    tabs: {
      name: "Tabs",
      control: { type: "object" },
      description:
        "Tab items array. Use `removeTabRole` or `removeAriaControls` on any tab to simulate accessibility issues.",
    },
    scenario: {
      name: "Preset Scenario",
      control: { type: "select" },
      options: [
        "Default",
        "Invalid ARIA (aria-chosen)",
        "Missing aria-controls",
        "Automated Activation",
        "Missing Roles",
        "Remove tab role from second tab only",
      ],
      description: "Preload test scenarios for accessibility validation tools.",
    },
  },
} satisfies Meta;

export const ResponsiveTabs: StoryObj = {
  render: ({ scenario, ...args }) => {
    let tabs = [...args.tabs];

    switch (scenario) {
      case "Invalid ARIA (aria-chosen)":
        args.tabAttributeMode = "aria-chosen";
        break;
      case "Missing aria-controls":
        tabs = tabs.map((tab, i) =>
          i === 1 ? { ...tab, removeAriaControls: true } : tab
        );
        break;
      case "Automated Activation":
        args.triggerActivation = "automated";
        break;
      case "Missing Roles":
        args.tabPanelRole = "";
        tabs = tabs.map(tab => ({ ...tab, removeTabRole: true }));
        break;
      case "Remove tab role from second tab only":
        tabs = tabs.map((tab, i) =>
          i === 1 ? { ...tab, removeTabRole: true } : tab
        );
        break;
    }

    return html`
      <db-wc-tabs
        .tabs=${tabs}
        .tabAttributeMode=${args.tabAttributeMode}
        .triggerActivation=${args.triggerActivation}
        .tabPanelRole=${args.tabPanelRole}
      ></db-wc-tabs>
    `;
  },
  args: {
    scenario: "Default",
    tabAttributeMode: "aria-selected",
    triggerActivation: "manual",
    tabPanelRole: "tabpanel",
    tabs: defaultTabs,
  },
};

export const Docs = {
  render: () => TabsDescription,
  parameters: {
    docsOnly: true,
  },
};

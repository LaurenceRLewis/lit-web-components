import "./db-lists";
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { ListDescription } from "./db-lists-description";

export default {
  title: "Deliberately broken for testing/Lists",
  component: "db-lists",
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    scenario: {
      name: "Test Scenario",
      control: { type: "select" },
      options: [
        "Default",
        "Div with no role",
        "Missing opening tag",
        "Missing closing tag",
        "Slot list items",
      ],
      description: "Choose the test case to simulate list structure issues.",
      table: { order: 1 },
    },
    listType: {
      name: "List Type",
      control: { type: "select" },
      options: ["ul", "ol"],
      description: "Choose between unordered or ordered list as the default type.",
      table: { order: 2 },
    },
  },
} satisfies Meta;

export const StaticList: StoryObj = {
  name: "List (Static content)",
  args: {
    scenario: "Default",
    listType: "ul",
  },
};

export const SlottedList: StoryObj = {
  name: "List (content via Slot)",
  args: {
    scenario: "Slot list items",
    listType: "ul",
  },
  render: (args) => html`
    <db-lists .scenario=${args.scenario} .listType=${args.listType}>
      <li>Tesla</li>
      <li>Volkswagen</li>
      <li>Holden</li>
      <li>Kia</li>
      <li>Nissan</li>
    </db-lists>
  `,
};

export const Docs = {
  render: () => ListDescription,
  parameters: {
    docsOnly: true,
  },
};

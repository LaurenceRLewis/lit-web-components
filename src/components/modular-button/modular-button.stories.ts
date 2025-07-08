import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./modular-button";

const meta: Meta = {
  title: "Modular Components/Modular Button",
  component: "modular-button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Use the `buttonTypes` prop to define the native button type. Set one of: `{ "button": true }`, `{ "submit": true }`, or `{ "reset": true }`. Only one is needed.\n\nUse the `label` prop to define the button text.',
      },
    },
  },
  argTypes: {
    buttonTypes: {
      name: "Button Types",
      control: { type: "object" },
      description:
        'Set one of: { "button": true }, { "submit": true }, or { "reset": true }. Only one is needed.',
    },
    label: {
      name: "Button Text",
      control: { type: "text" },
      description: "The visible text label inside the button",
    },
  },
};
export default meta;

type Story = StoryObj;

export const Button: Story = {
  args: {
    buttonTypes: {
      button: true,
    },
    label: "My Button",
  },
  render: (args) => html`
    <modular-button
      .buttonTypes=${args.buttonTypes}
      .label=${args.label}
    ></modular-button>
  `,
};
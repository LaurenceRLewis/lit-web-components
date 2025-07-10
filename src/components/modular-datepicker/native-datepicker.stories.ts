import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./native-datepicker";
import { NativeDatePickerDescription } from "./native-datepicker.description";

const meta: Meta = {
  title: "Native HTML Components/HTML Datepicker",
  component: "native-datepicker",
  parameters: {
    docs: {
      page: () => html`
        <storybook-title>HTML Datepicker</storybook-title>
        <storybook-subtitle
          >Native HTML input with locale-aware formatting</storybook-subtitle
        >
        ${NativeDatePickerDescription()}
        <storybook-primary />
        <storybook-argtypes />
      `,
    },
  },
  argTypes: {
    mode: {
      name: "Input Mode",
      control: { type: "radio" },
      options: ["date", "datetime", "time"], // ← add "time"
      description: "Choose between date only, date/time, or time only input.",
    },
  },
};

export default meta;
type Story = StoryObj;

export const HTMLDatepicker: Story = {
  args: {
    mode: "date",
  },
};

HTMLDatepicker.storyName = "HTML Datepicker Build";

export const Documentation: Story = {
  render: () => NativeDatePickerDescription(),
  parameters: {
    docsOnly: true,
  },
};

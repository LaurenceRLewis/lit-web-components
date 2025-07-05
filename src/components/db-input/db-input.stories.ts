import "./db-input.js";
import { InputDescription } from "./db-input-description";

const Template = ({ inputType, ariaLabel, autoComplete, inputId, labelText }: any) =>
  `<db-form-input
     input-type="${inputType}"
     aria-label="${ariaLabel}"
     auto-complete="${autoComplete}"
     input-id="${inputId}"
     label-text="${labelText}"
   ></db-form-input>`;

export default {
  title: "Deliberately broken for testing/Input",
  tags: ["autodocs"],
  component: "db-form-input",
  argTypes: {
    inputType: {
      control: { type: "select" },
      options: ["text", "email", "tel", "url"],
      description: "Input type attribute",
    },
    autoComplete: {
      control: { type: "select" },
      options: [
        "",
        "name",
        "given-name",
        "family-name",
        "email",
        "tel",
        "username",
      ],
      description: "Optional autocomplete attribute on <input>. Leave blank to omit.",
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Optional aria-label on <input>",
    },
    labelText: {
      control: { type: "text" },
      description: "Visible label if no slotted <label> is provided",
    },
    inputId: {
      control: { type: "text" },
      description: "Input ID for linking. Must match slotted <label for='...'> if used.",
    },
  },
};

export const Docs = {
  render: () => InputDescription,
  parameters: {
    docsOnly: true,
  },
};

export const Input = {
  render: (args: any) => `
    <db-form-input
      input-type="${args.inputType}"
      aria-label="${args.ariaLabel}"
      auto-complete="${args.autoComplete}"
      input-id="${args.inputId}"
    >
      <label slot="label" for="${args.inputId}">${args.labelText || "Label"}</label>
    </db-form-input>
  `,
  args: {
    inputType: "email",
    ariaLabel: "",
    autoComplete: "email",
    inputId: "slotted-email-001",
    labelText: "Custom Email Label",
  },
};
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./dialog";
import { DialogModal } from "./dialog";

const meta: Meta<DialogModal> = {
  title: "Native HTML Components/HTML Dialog",
  component: "dialog-modal",
  parameters: {
    controls: { expanded: true },
    docs: {
      page: () => html`
        <style>
          .docs-wrapper {
            font-family: "Segoe UI", sans-serif;
            max-width: 720px;
            margin: 2rem auto;
            line-height: 1.6;
          }

          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.25rem;
            margin-top: 1.5rem;
          }

          ul {
            padding-left: 1.25rem;
          }

          table {
            margin-top: 1rem;
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            border: 1px solid #ccc;
            padding: 0.5rem;
            text-align: left;
          }
        </style>
        <div class="docs-wrapper">
          <h1>Native &lt;dialog&gt; Web Component</h1>
          <p>
            This component wraps the native HTML
            <code>&lt;dialog&gt;</code> element, with optional modal or
            non-modal rendering, keyboard focus management, and auto-focus
            control for accessibility testing.
          </p>

          <h2>Features</h2>
          <ul>
            <li>
              Uses <code>showModal()</code> or <code>show()</code> based on
              props
            </li>
            <li>
              Focus can be manually assigned to heading, content, buttons, or
              links
            </li>
            <li>Supports autoFocus or manual focus control on open</li>
            <li>Styleable with design tokens like <code>--purple-700</code></li>
          </ul>

          <h2>Props</h2>
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>open</code></td>
                <td>boolean</td>
                <td>Controls whether the dialog is open</td>
              </tr>
              <tr>
                <td><code>showModal</code></td>
                <td>"Yes" | "No"</td>
                <td>
                  Uses <code>showModal()</code> if "Yes", otherwise
                  <code>show()</code>
                </td>
              </tr>
              <tr>
                <td><code>heading</code></td>
                <td>string</td>
                <td>Accessible heading inside <code>&lt;h2&gt;</code></td>
              </tr>
              <tr>
                <td><code>focusManagement</code></td>
                <td>string</td>
                <td>Determines where focus is sent on open</td>
              </tr>
              <tr>
                <td><code>useAutoFocus</code></td>
                <td>boolean</td>
                <td>Whether to apply <code>autofocus</code> attribute</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    },
  },
  argTypes: {
    showModal: {
      name: "Modal",
      control: "radio",
      options: ["Yes", "No"],
    },
    focusManagement: {
      name: "Focus Management",
      control: "select",
      options: [
        "Focus is not set",
        "focus is set to the new div container",
        "focus is set to the dialog heading",
        "focus is set to the fake link",
        "focus is set to the close button",
        "focus is set to the first focusable element inside the dialog",
      ],
    },
    useAutoFocus: {
      name: "Use Autofocus",
      control: "boolean",
    },
    ShowOpenDialog: {
      name: "Show Open Dialog",
      control: { type: "boolean" },
    },
    heading: {
      control: "text",
    },
  },
};
export default meta;
type Story = StoryObj<DialogModal>;

export const Dialog: Story = {
  args: {
    ShowOpenDialog: false,
    showModal: "Yes",
    heading: "Dialog Heading",
    focusManagement: "Focus is not set",
    useAutoFocus: false,
  },
  render: (args) => {
    return html`
      <style>
        button.open-button {
          color: #fff;
          background-color: #5941a9;
          border: none;
          border-radius: 1em;
          padding: 1em 2em;
          transition: background-color 0.3s;
        }

        button.open-button:hover {
          background-color: #7b61c4;
        }

        button.open-button:focus {
          outline: none;
        }

        button.open-button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px #fff, 0 0 0 5px #a886e5;
        }

      </style>

      <div class="story-wrapper">
        <button
          class="open-button"
          @click=${() => {
            const dlg = document.querySelector<DialogModal>("dialog-modal");
            if (dlg) dlg.ShowOpenDialog = true;
          }}
        >
          Open Dialog
        </button>

        <dialog-modal
          .open=${args.ShowOpenDialog}
          .showModal=${args.showModal}
          .heading=${args.heading}
          .focusManagement=${args.focusManagement}
          .useAutoFocus=${args.useAutoFocus}
          @close-dialog=${() => {
            const dlg = document.querySelector<DialogModal>("dialog-modal");
            if (dlg) dlg.ShowOpenDialog = false;
          }}
        >
          <p>This dialog was opened via Storybook.</p>
          <p>You can test keyboard focus handling using the Storybook control Props.</p>
        </dialog-modal>
      </div>
    `;
  },
};

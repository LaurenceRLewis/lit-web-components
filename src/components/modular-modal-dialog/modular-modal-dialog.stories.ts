import { html } from 'lit';
import type { Meta, StoryFn } from '@storybook/web-components';
import './modular-modal-dialog';
import './modular-sheet-dialog-content';
import './modular-standard-dialog-content';

export default {
  title: 'Modular Components/Modal Dialog (ARIA)',
  component: 'modular-modal-dialog',
  argTypes: {
    modal: {
      name: 'Modal or Non-modal',
      control: { type: 'boolean' },
      table: { category: 'Behavior' },
    },
    dialogType: {
      name: 'Standard modal or side sheet',
      control: { type: 'select' },
      options: ['standard', 'sheet'],
      table: { category: 'Behavior' },
    },
    backgroundAttribute: {
      name: 'aria-hidden or inert',
      options: ['aria-hidden', 'inert'],
      control: { type: 'radio' },
      description: 'Choose method to hide background for assistive tech',
      table: { category: 'A11y' },
    },
    heading: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    triggerLabel: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    open: {
      control: { type: 'boolean' },
      table: { category: 'Behavior' },
    },
  },
  args: {
    modal: true,
    dialogType: 'standard',
    backgroundAttribute: 'aria-hidden',
    heading: 'Sheet Dialog',
    triggerLabel: 'Open Sheet',
    open: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'A modular Lit web component providing an accessible modal dialog or sheet with focus trapping, ESC to close, and background `aria-hidden`/`inert` options. Overlay and dialog share a fixed wrapper to ensure the dialog always sits above the scrim.',
      },
    },
  },
} satisfies Meta;

const Template: StoryFn = (args: any) => html`
  <modular-modal-dialog
    .modal=${args.modal}
    .dialogType=${args.dialogType}
    .backgroundAttribute=${args.backgroundAttribute}
    .heading=${args.heading}
    .triggerLabel=${args.triggerLabel}
    .open=${args.open}
  >
    ${args.dialogType === 'standard'
      ? html`<modular-standard-dialog-content></modular-standard-dialog-content>`
      : html`<modular-sheet-dialog-content></modular-sheet-dialog-content>`}
  </modular-modal-dialog>
`;

export const ModalDialog = Template.bind({});
ModalDialog.storyName = 'Modal Dialog (ARIA) Build';

export const WithCustomSlottedContent: StoryFn = (args: any) => html`
  <modular-modal-dialog
    .modal=${args.modal}
    .dialogType=${args.dialogType}
    .backgroundAttribute=${args.backgroundAttribute}
    heading="Custom Heading"
    triggerLabel="Open Dialog"
  >
    <div>
      <h3>Custom Content</h3>
      <p>This content is provided by the story via a slot.</p>
      <button>Focusable Button</button>
    </div>
  </modular-modal-dialog>
`;
WithCustomSlottedContent.args = {
  modal: true,
  dialogType: 'sheet',
  backgroundAttribute: 'inert',
};

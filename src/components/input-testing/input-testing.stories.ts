import { html } from 'lit';
import './input-testing.ts';

export default {
  title: 'Deliberately broken for testing/Input A11y Testing',
  tags: ['autodocs'],
  component: 'input-testing',
  argTypes: {
    associationType: {
      name: 'Label/Input DOM Scenario',
      control: { type: 'select' },
      options: [
        'label-in-light-slot-input-in-shadow',
        'label-in-one-shadow-input-in-another',
        'label-and-input-in-same-shadow',
      ],
      description: 'Controls how label and input are structured for DOM separation testing.',
    },
    inputType: {
      control: { type: 'select' },
      options: ['text', 'email', 'tel', 'url'],
    },
    autoComplete: {
      control: { type: 'select' },
      options: ['', 'name', 'given-name', 'family-name', 'email', 'tel', 'username'],
    },
    ariaLabel: { control: 'text' },
    labelText: { control: 'text' },
    inputId: { control: 'text' },
  },
  args: {
    associationType: 'label-and-input-in-same-shadow',
    inputType: 'text',
    autoComplete: '',
    ariaLabel: '',
    labelText: 'First name',
    inputId: 'input-id-123',
  },
  parameters: {
    controls: {
      expanded: true,
      include: [
        'associationType',
        'inputType',
        'autoComplete',
        'ariaLabel',
        'labelText',
        'inputId',
      ],
    },
  },
};

export const Input = (args: any) => html`
  <input-testing
    .associationType=${args.associationType}
    .inputType=${args.inputType}
    .autoComplete=${args.autoComplete}
    .ariaLabel=${args.ariaLabel}
    .labelText=${args.labelText}
    .inputId=${args.inputId}
  ></input-testing>
`;

import { InputDescription } from './input-testing.description.js';

export const Docs = {
  render: () => InputDescription,
  parameters: {
    docsOnly: true,
  },
};
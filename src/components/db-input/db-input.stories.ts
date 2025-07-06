import './db-input.ts';
import { InputDescription } from './db-input-description';

const presetMap: Record<string, any> = {
  Default: {
    inputType: 'text',
    autoComplete: '',
    ariaLabel: '',
    inputId: 'default-id-001',
    labelText: 'First name',
  },
  'No Label': {
    inputType: 'text',
    autoComplete: '',
    ariaLabel: '',
    inputId: 'nolabel-id-002',
    labelText: '',
  },
  'Wrong For': {
    inputType: 'email',
    autoComplete: 'email',
    ariaLabel: '',
    inputId: 'mismatch-id-003',
    labelText: 'Email',
  },
  'Missing Autocomplete': {
    inputType: 'text',
    autoComplete: '',
    ariaLabel: '',
    inputId: 'autocomplete-id-004',
    labelText: 'Street address',
  },
};

const renderTemplate = (args: any) => `
  <db-form-input
    input-type="${args.inputType}"
    aria-label="${args.ariaLabel}"
    auto-complete="${args.autoComplete}"
    input-id="${args.inputId}"
    label-text="${args.labelText}"
  >
    ${args.labelText && !args.preset.includes('No Label')
      ? `<label slot="label" for="${args.inputId}">${args.labelText}</label>`
      : ''}
  </db-form-input>
`;

export default {
  title: 'Deliberately broken for testing/Input',
  tags: ['autodocs'],
  component: 'db-form-input',
  argTypes: {
    preset: {
      name: 'Preset Scenario',
      control: { type: 'select' },
      options: ['Default', 'No Label', 'Wrong For', 'Missing Autocomplete'],
      description: 'Quickly apply common test cases for accessibility validation',
      table: { category: 'Test Presets' },
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
    preset: 'Default',
    ...presetMap['Default'],
  },
  decorators: [
    (storyFn: any, { args }: any) => {
      const presetArgs = presetMap[args.preset] ?? {};
      return storyFn({ ...args, ...presetArgs });
    },
  ],
};

export const Input = {
  render: renderTemplate,
};

export const Docs = {
  render: () => InputDescription,
  parameters: {
    docsOnly: true,
  },
};

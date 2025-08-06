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

const renderTemplate = (args: any) => {
  const presetArgs = presetMap[args.preset] ?? {};
  const merged = { ...args, ...presetArgs };

  let labelMarkup = '';
  if (merged.labelText && merged.preset !== 'No Label') {
    switch (merged.associationType) {
      case 'light-slot-shadow-input':
        labelMarkup = `<label slot="label" for="${merged.inputId}">${merged.labelText}</label>`;
        break;
      case 'split-shadow':
        labelMarkup = `<label slot="label" for="${merged.inputId}">${merged.labelText}</label>`;
        break;
      case 'same-shadow':
      default:
        labelMarkup = `<label slot="label" for="${merged.inputId}">${merged.labelText}</label>`;
        break;
    }
  }

  return `
    <db-form-input
      input-type="${merged.inputType}"
      aria-label="${merged.ariaLabel}"
      auto-complete="${merged.autoComplete}"
      input-id="${merged.inputId}"
      label-text="${merged.labelText}"
    >
      ${labelMarkup}
    </db-form-input>
  `;
};

export default {
  title: 'Deliberately broken for testing/Input',
  tags: ['autodocs'],
  component: 'db-form-input',
  argTypes: {
    associationType: {
      name: 'Label/Input Association',
      control: { type: 'select' },
      options: ['same-shadow', 'light-slot-shadow-input', 'split-shadow'],
      description: 'Defines how the label and input are structured across DOM scopes.',
    },
    preset: {
      name: 'Preset Scenario',
      control: { type: 'select' },
      options: ['Default', 'No Label', 'Wrong For', 'Missing Autocomplete'],
      description: 'Predefined test cases for accessibility evaluation.',
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
    associationType: 'same-shadow',
    preset: 'Default',
    inputType: 'text',
    autoComplete: '',
    ariaLabel: '',
    inputId: 'default-id-001',
    labelText: 'First name',
  },
  parameters: {
    controls: {
      expanded: true,
      include: [
        'associationType',
        'preset',
        'inputType',
        'autoComplete',
        'ariaLabel',
        'labelText',
        'inputId',
      ],
    },
  },
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

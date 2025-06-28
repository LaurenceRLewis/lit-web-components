import { html } from 'lit';
import type { StoryFn } from '@storybook/web-components';
import './combobox';
import description from './combobox.description';

export default {
  title: 'Components/Combobox (List)',
  component: 'aria-combobox',
  parameters: {
    docs: {
      page: () => html`
        <storybook-title>ARIA Combobox (List)</storybook-title>
        <storybook-subtitle>Lit component with aria-autocomplete="list"</storybook-subtitle>
        ${description()}
        <storybook-primary />
        <storybook-argtypes />
      `,
    },
  },
  argTypes: {
    showHelpText: {
      name: 'Show help text',
      control: { type: 'radio' },
      options: ['Yes', 'No'],
      description: 'Displays help text under the label',
    },
    showToggleButton: {
      name: 'Show toggle button',
      control: { type: 'boolean' },
      description: 'Displays a toggle button to open/close the listbox',
    },
    showAllOptionsAfterSelection: {
      name: 'Show all options after selection',
      control: { type: 'radio' },
      options: ['Yes', 'No'],
      description: 'Controls whether the full list is shown after a selection',
    },
  },
};

interface Args {
  showHelpText: 'Yes' | 'No';
  showToggleButton: boolean;
  showAllOptionsAfterSelection: 'Yes' | 'No';
}

const Template: StoryFn<Args> = (args) => html`
  <aria-combobox
    .showHelpText=${args.showHelpText}
    .showToggleButton=${args.showToggleButton}
    .showAllOptionsAfterSelection=${args.showAllOptionsAfterSelection}
  ></aria-combobox>
`;

export const Default = Template.bind({});
Default.storyName = 'Combobox (List)';
Default.args = {
  showHelpText: 'No',
  showToggleButton: true,
  showAllOptionsAfterSelection: 'Yes',
};

export const Documentation = () => html`${description()}`;
Documentation.parameters = { docsOnly: true };
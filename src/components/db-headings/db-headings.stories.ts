import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './db-headings';
import { HeadingsDescription } from './db-headings.description';

const meta: Meta = {
  title: 'Deliberately broken for testing/Headings',
  component: 'db-headings',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => html`${HeadingsDescription}`,
    },
  },
  argTypes: {
    scenario: {
      name: 'Preset Scenario',
      options: [
        'valid',
        'missingH1',
        'skippedLevels',
        'multipleH1',
        'notSemantic',
      ],
      control: { type: 'select' },
      description: 'Select a heading structure to test.',
      table: {
        category: 'Test Scenario',
        defaultValue: { summary: 'valid' },
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    scenario: 'valid',
  },
};

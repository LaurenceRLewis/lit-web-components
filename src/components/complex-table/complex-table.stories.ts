import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './complex-table';

const meta: Meta = {
  title: 'Complex Components/Complex Table',
  component: 'complex-table',
  argTypes: {
    stickyLastColumn: {
      name: 'Sticky last column',
      control: 'boolean',
      description: 'Toggles sticky right column with scroll visibility support',
    },
    fixedWidth: {
      name: 'Fixed width',
      control: 'text',
      description: 'Sets wrapper width (e.g. 400px or 100%)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    stickyLastColumn: true,
    fixedWidth: '600px',
  },
  render: ({ stickyLastColumn, fixedWidth }) => html`
    <complex-table
      .stickyLastColumn=${stickyLastColumn}
      .fixedWidth=${fixedWidth}
    ></complex-table>
  `,
};

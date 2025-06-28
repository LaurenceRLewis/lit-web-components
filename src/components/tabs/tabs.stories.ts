import './tabs';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { TabsDescription } from './tabs-description';

export default {
  title: 'Complex Components/Tabs',
  component: 'wc-tabs',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    tabPanelTabindex: {
      name: 'Add tabindex 0 to Tabpanel',
      control: { type: 'boolean' },
    },
    triggerActivation: {
      name: 'Manual or automated activation',
      control: { type: 'select' },
      options: ['automated', 'manual'],
      defaultValue: 'manual',
    },
    textColor: {
      name: 'Text colour',
      control: { type: 'color' },
    },
    tabBackground: {
      name: 'Tab background colours',
      control: { type: 'object' },
    },
    viewportThreshold: {
      name: 'Viewport switch threshold (px)',
      control: { type: 'number' },
      defaultValue: 400,
    },
    tabs: { table: { disable: true } },
  },
} satisfies Meta;

export const ResponsiveTabs: StoryObj = {
  args: {
    tabPanelTabindex: true,
    triggerActivation: 'manual',
    textColor: 'rgba(0, 0, 0, 1)',
    tabBackground: {
      default: 'rgba(209, 203, 219, 1)',
      selected: 'rgba(156, 39, 176, 1)',
    },
    viewportThreshold: 400,
    tabs: [
      {
        id: 'html-009878',
        title: 'HTML',
        content: html`
          <h3>About HTML & Accessibility</h3>
          <p>
            HTML is the foundation of accessible, semantic content. Using
            appropriate tags enables both human and machine readability,
            improves SEO, and supports assistive technology.
          </p>
        `,
      },
      {
        id: 'aria-009878',
        title: 'ARIA',
        content: html`
          <h3>About ARIA & Accessibility</h3>
          <p>
            ARIA (Accessible Rich Internet Applications) enhances web
            accessibility by providing semantic meaning to dynamic interfaces.
          </p>
        `,
      },
      {
        id: 'react-009878',
        title: 'React',
        content: html`
          <h3>About React & Accessibility</h3>
          <p>
            React allows for modular, interactive interfaces that can be
            combined with semantic HTML and ARIA for full accessibility support.
          </p>
        `,
      },
    ],
  },
};

export const Documentation = {
  render: () => TabsDescription,
  parameters: {
    docsOnly: true,
  },
};

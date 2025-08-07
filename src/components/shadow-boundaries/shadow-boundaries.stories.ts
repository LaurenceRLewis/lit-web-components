import { html } from 'lit';
import type { Meta } from '@storybook/web-components';
import './shadow-boundaries.js';

export default {
  title: 'Deliberately broken for testing/Shadow Root Boundaries',
  parameters: {
    docsOnly: false,
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta;

export const Default = () => html`<shadow-boundaries></shadow-boundaries>`;

import { html } from 'lit';
import './shadow-boundaries.ts';
import { ShadowBoundariesDescription } from './shadow-boundaries.description.js';

export default {
  title: 'Deliberately broken for testing/Shadow Boundaries',
  component: 'shadow-boundaries',
  tags: ["autodocs"],
  argTypes: {
    namingTechnique: {
      control: { type: 'select' },
      options: [
        'Slotted Label with for',
        'aria-labelledby cross-boundary',
        'aria-label via prop',
      ],
      description: 'Accessible name technique (label is always visible)',
    },
    inputId: {
      control: 'text',
      description: 'Input element ID used for association',
      table: { category: 'Props' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Applies aria-label directly to the input',
      table: { category: 'Props' },
    },
    labelledById: {
      control: 'text',
      description: 'References an external element ID for aria-labelledby',
      table: { category: 'Props' },
    },
  },
  args: {
    namingTechnique: 'Slotted Label with for',
    inputId: 'input-cross-shadow',
    ariaLabel: '',
    labelledById: '',
  },
  parameters: {
    docs: {
      page: () => ShadowBoundariesDescription,
    },
  },
};

export const Default = (args: any) => {
  const { namingTechnique, inputId, ariaLabel, labelledById } = args;

  switch (namingTechnique) {
    case 'Slotted Label with for':
      return html`
        <label slot="label" for=${inputId}>Full name</label>
        <shadow-boundaries .inputId=${inputId}></shadow-boundaries>
      `;

    case 'aria-labelledby cross-boundary':
      return html`
        <span id="external-label-id">Full name</span>
        <shadow-boundaries
          .inputId=${inputId}
          .labelledById=${'external-label-id'}
        ></shadow-boundaries>
      `;

    case 'aria-label via prop':
      return html`
        <shadow-boundaries
          .inputId=${inputId}
          .ariaLabel=${ariaLabel || 'Full name'}
        ></shadow-boundaries>
      `;

    default:
      return html`<shadow-boundaries .inputId=${inputId}></shadow-boundaries>`;
  }
};

export const Docs = {
  render: () => ShadowBoundariesDescription,
  parameters: {
    docsOnly: true,
  },
};

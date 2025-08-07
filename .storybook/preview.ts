import type { Preview } from '@storybook/web-components';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      story: {
        inline: false,
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'Docs', 'Basic Components', 'Complex Components', 'Deliberately broken for testing'],
      },
    },
  },
};

export default preview;
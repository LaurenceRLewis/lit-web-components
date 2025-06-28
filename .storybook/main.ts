import { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|js)'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  addons: [
    // '@storybook/addon-essentials',
    // '@storybook/addon-a11y',
    // '@storybook/addon-controls',
    // '@storybook/addon-docs',
    // '@storybook/addon-actions',
  ],
};

export default config;
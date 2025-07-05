import { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
  '../src/stories/**/*.stories.@(ts|js)',         // your top-level docs
  '../src/components/**/*.stories.@(ts|js)',      // your components
],
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
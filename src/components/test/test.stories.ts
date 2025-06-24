import './test.ts';

export default {
  title: 'Components/Test',
  tags: ['autodocs'],
  component: 'my-element',
  argTypes: {
    name: { control: 'text' },
  },
};

const Template = ({ name }: any) => `<my-element name="${name}"></my-element>`;

// Correct way to define a story with args
export const Default = {
  render: Template,
  args: {
    name: 'Laurence',
  },
}
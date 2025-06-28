import './input.ts';

const Template = ({ label }: { label: string }) =>
  `<form-input label="${label}"></form-input>`;

export default {
  title: 'Basic Components/Input',
  tags: ['autodocs'],
  component: 'form-input',
  argTypes: {
    label: {
      control: { type: 'select' },
      options: ['Given name', 'Family name', 'Email', 'Mobile'],
    },
  },
};

// CSF3 story using `args`
export const Default = {
  render: Template,
  args: {
    label: 'Given name',
  },
};
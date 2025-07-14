import { html } from 'lit';
import './naming-inputs.ts';

const validScenarios = [
  'Shadow DOM Label and Input',
  'Light DOM Label with aria-labelledby',
  'Multiple Labels',
];

const invalidScenarios = [
  'Aria Labelledby from Light DOM',
  'Light DOM Label with Shadow Input',
  'Missing Input ID',
  'Label Without for',
  'Mismatched for and id',
];

export default {
  title: 'Deliberately broken for testing/Naming Inputs',
  component: 'naming-inputs',
  argTypes: {
    scenarioType: {
      control: { type: 'radio' },
      options: ['Valid', 'Invalid'],
    },
    scenario: {
      control: { type: 'select' },
      options: validScenarios, // will be updated dynamically
    },
  },
};

export const Default = (args: any) => {
  const options = args.scenarioType === 'Invalid' ? invalidScenarios : validScenarios;
  if (!options.includes(args.scenario)) {
    args.scenario = options[0];
  }

  return html`
    <naming-inputs
      .scenarioType=${args.scenarioType}
      .scenario=${args.scenario}
    ></naming-inputs>
  `;
};

Default.args = {
  scenarioType: 'Valid',
  scenario: 'Shadow DOM Label and Input',
};
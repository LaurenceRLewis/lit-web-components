import { html } from 'lit';
import './naming-inputs.ts';

const validScenarios = [
  'Shadow DOM Label and Input',
  'Light DOM Label with aria-labelledby',
  'Multiple Labels',
  'Label in Light Slot with Shadow Input',
];

const invalidScenarios = [
  'Aria Labelledby from Light DOM',
  'Light DOM Label with Shadow Input',
  'Missing Input ID',
  'Label Without for',
  'Mismatched for and id',
];

const scenarioOptions = [
  'Custom Association',
  ...validScenarios,
  ...invalidScenarios,
];

const associationOptions = [
  'Label in Light DOM, input in Shadow DOM',
  'Label slot in one shadow dom, input in another',
  'Label in Light DOM and input in Shadow DOM (slot)',
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
      options: scenarioOptions,
    },
    associationType: {
      control: { type: 'select' },
      options: associationOptions,
    },
  },
};

export const Default = (args: any) => {
  const isCustom = args.scenario === 'Custom Association';
  const scenario = isCustom ? '' : args.scenario;
  const renderLabelOutside =
    args.associationType === 'Label in Light DOM, input in Shadow DOM';

  return html`
    ${renderLabelOutside
      ? html`<label for="shared-id">Your name</label>`
      : null}

    <naming-inputs
      .scenarioType=${args.scenarioType}
      .scenario=${scenario}
      .associationType=${args.associationType}
    ></naming-inputs>
  `;
};

Default.args = {
  scenarioType: 'Valid',
  scenario: 'Custom Association',
  associationType: 'Label in Light DOM, input in Shadow DOM',
};

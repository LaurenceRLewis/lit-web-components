import { html } from 'lit';
import './shadow-boundaries.js';

const validScenarios = [
  'Shadow DOM Label and Input',
  'Light DOM Label with aria-labelledby',
  'Multiple Labels',
  'Label in Light Slot with Shadow Input',
];

const validMayNotBeAccessible = ['Aria Labelledby from Light DOM'];

const invalidScenarios = [
  'Light DOM Label with Shadow Input',
  'Missing Input ID',
  'Label Without for',
  'Mismatched for and id',
];

// ❌ 'Custom Association' is now removed from this list
const scenarioOptions = [
  ...validScenarios,
  ...validMayNotBeAccessible,
  ...invalidScenarios,
];

const associationOptions = [
  'Label in Light DOM, input in Shadow DOM',
  'Label slot in one shadow dom, input in another',
  'Label in Light DOM and input in Shadow DOM (slot)',
];

export default {
  title: 'Deliberately broken for testing/Shadow Root Boundaries',
  component: 'shadow-boundaries',
  argTypes: {
    activateAssociationTypeTests: {
      name: 'Activate Association Type Tests',
      control: { type: 'radio' },
      options: ['Yes', 'No'],
    },
    scenarioType: {
      control: { type: 'radio' },
      options: ['Valid', 'Valid - May not be accessible', 'Invalid'],
      if: { arg: 'activateAssociationTypeTests', eq: 'No' },
    },
    scenario: {
      control: { type: 'select' },
      options: scenarioOptions,
      if: { arg: 'activateAssociationTypeTests', eq: 'No' },
    },
    associationType: {
      control: { type: 'select' },
      options: associationOptions,
      if: { arg: 'activateAssociationTypeTests', eq: 'Yes' },
    },
  },
};

export const Default = (args: any) => {
  const showCustomLabel =
    args.activateAssociationTypeTests === 'Yes' &&
    args.associationType === 'Label in Light DOM, input in Shadow DOM';

  return html`
    ${showCustomLabel
      ? html`<label for="shared-id">Your name</label>`
      : null}

    <shadow-boundaries
      .scenarioType=${args.scenarioType}
      .scenario=${args.scenario}
      .associationType=${args.associationType}
      .activateAssociationTypeTests=${args.activateAssociationTypeTests}
    ></shadow-boundaries>
  `;
};

Default.args = {
  activateAssociationTypeTests: 'No',
  scenarioType: 'Valid',
  scenario: 'Shadow DOM Label and Input',
  associationType: 'Label in Light DOM, input in Shadow DOM',
};

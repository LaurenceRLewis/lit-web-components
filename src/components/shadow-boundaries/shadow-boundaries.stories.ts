import { html, nothing } from 'lit';
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

const associationOptions = [
  'Label in Light DOM, input in Shadow DOM',
  'Label slot in one shadow dom, input in another',
  'Label in Light DOM and input in Shadow DOM (slot)',
];

export default {
  title: 'Deliberately broken for testing/Shadow Root Boundaries',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Default = (args: any = {}) => {
  args.activateAssociationTypeTests ??= 'No';
  args.scenarioType ??= 'Valid';
  args.scenario ??= validScenarios[0];
  args.associationType ??= associationOptions[0];

  let scenarioOptions: string[] = [];

  if (args.activateAssociationTypeTests === 'No') {
    switch (args.scenarioType) {
      case 'Valid':
        scenarioOptions = validScenarios;
        break;
      case 'Valid - May not be accessible':
        scenarioOptions = validMayNotBeAccessible;
        break;
      case 'Invalid':
        scenarioOptions = invalidScenarios;
        break;
    }

    if (!scenarioOptions.includes(args.scenario)) {
      args.scenario = scenarioOptions[0];
    }
  }

  const handleRadioChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    args[target.name] = target.value;
    (document.querySelector('shadow-boundaries') as HTMLElement & {
      requestUpdate: () => void;
    })?.requestUpdate();
  };

  const handleSelectChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    args[target.name] = target.value;
    (document.querySelector('shadow-boundaries') as HTMLElement & {
      requestUpdate: () => void;
    })?.requestUpdate();
  };

  const showLabelOutside =
    args.activateAssociationTypeTests === 'Yes' &&
    args.associationType === 'Label in Light DOM, input in Shadow DOM';

  const styles = `
    :root {
      --purple-900: #4338ca;
      --purple-700: #5941a9;
      --purple-500: #7b61c4;
      --purple-300: #a886e5;
      --purple-100: #d3beff;
      --white: #ffffff;
      --black: #262626;
    }

    body {
      font-family: Aptos, Bierstadt, "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }

    form {
      font-family: inherit;
      margin-top: 2rem;
      max-width: 1024px;
    }

    fieldset {
      margin-bottom: 1.5rem;
      padding: 1rem;
      border: 2px solid var(--purple-300);
      border-radius: 6px;
    }

    legend {
      font-weight: bold;
      color: var(--purple-700);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    label {
      display: block;
      margin-top: 0.5rem;
      font-weight: 500;
    }

    select {
      margin-top: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid var(--purple-300);
      border-radius: 4px;
      background-color: var(--white);
      color: var(--black);
    }

    input[type="radio"] {
      margin-right: 0.5rem;
    }

    .sr-only {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  `;

  return html`
    <style>${styles}</style>

    ${showLabelOutside
      ? html`<label for="shared-id">Your name</label>`
      : nothing}

    <shadow-boundaries
      .scenarioType=${args.scenarioType}
      .scenario=${args.scenario}
      .associationType=${args.associationType}
      .activateAssociationTypeTests=${args.activateAssociationTypeTests}
    ></shadow-boundaries>

    <form>
      <fieldset>
        <legend>Activate Association Type Tests</legend>
        <label>
          <input
            type="radio"
            name="activateAssociationTypeTests"
            value="No"
            ?checked=${args.activateAssociationTypeTests === 'No'}
            @change=${handleRadioChange}
          />
          No
        </label>
        <label>
          <input
            type="radio"
            name="activateAssociationTypeTests"
            value="Yes"
            ?checked=${args.activateAssociationTypeTests === 'Yes'}
            @change=${handleRadioChange}
          />
          Yes
        </label>
      </fieldset>

      ${args.activateAssociationTypeTests === 'No'
        ? html`
            <fieldset>
              <legend>Scenario Type</legend>
              <label>
                <input
                  type="radio"
                  name="scenarioType"
                  value="Valid"
                  ?checked=${args.scenarioType === 'Valid'}
                  @change=${handleRadioChange}
                />
                Valid
              </label>
              <label>
                <input
                  type="radio"
                  name="scenarioType"
                  value="Valid - May not be accessible"
                  ?checked=${args.scenarioType === 'Valid - May not be accessible'}
                  @change=${handleRadioChange}
                />
                Valid – May not be accessible
              </label>
              <label>
                <input
                  type="radio"
                  name="scenarioType"
                  value="Invalid"
                  ?checked=${args.scenarioType === 'Invalid'}
                  @change=${handleRadioChange}
                />
                Invalid
              </label>
            </fieldset>

            <fieldset>
              <legend>Select Scenario</legend>
              <label for="scenarioSelect" class="sr-only">Scenario</label>
              <select
                name="scenario"
                id="scenarioSelect"
                @change=${handleSelectChange}
              >
                ${scenarioOptions.map(
                  (option) => html`
                    <option
                      value=${option}
                      ?selected=${args.scenario === option}
                    >
                      ${option}
                    </option>
                  `
                )}
              </select>
            </fieldset>
          `
        : html`
            <fieldset>
              <legend>Association Type</legend>
              <label for="associationTypeSelect" class="sr-only">Association Type</label>
              <select
                name="associationType"
                id="associationTypeSelect"
                @change=${handleSelectChange}
              >
                ${associationOptions.map(
                  (option) => html`
                    <option
                      value=${option}
                      ?selected=${args.associationType === option}
                    >
                      ${option}
                    </option>
                  `
                )}
              </select>
            </fieldset>
          `}
    </form>
  `;
};

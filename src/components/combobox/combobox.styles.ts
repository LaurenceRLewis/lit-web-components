import { css } from "lit";

export const comboboxStyles = css`
  h1 {
    margin-bottom: 0.5em;
  }

  label {
    display: block;
  }

  .comboboxContainer {
    background-color: var(--surface-bg, #fff);
    color: var(--surface-text, #262626);
    position: relative;
    padding-bottom: 1em;
    width: 300px;
  }

  .comboboxInput {
    flex-grow: 1;
    width: 100%;
    height: 35px;
    padding: 0.3125em 0.625em;
    border: 0.0625em solid var(--purple-700, #5941a9);
    border-radius: 0.3125em;
    outline: none;
    box-sizing: border-box;
    font-size: var(--text-base, 1rem);
    background-color: var(--white, #ffffff);
    color: var(--black, #262626);
  }

  .comboboxInput:focus-visible {
    border-color: var(--focus-color, #9c27b0);
    box-shadow: var(--focus-outline, 0 0 0 3px #d1c4e9);
  }

  .comboboxWrapper {
    display: flex;
    align-items: stretch;
  }

  .toggleButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 38px;
    background-color: var(--purple-700, #5941a9);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 0.3125em;
  }

  .toggleButton:hover {
    outline: 0.125em solid var(--white, #ffffff);
  }

  .comboboxListbox {
    position: absolute;
    width: 100%;
    max-height: 200px;
    margin-top: 0.3125em;
    overflow-y: auto;
    border: 0.0625em solid var(--purple-700, #5941a9);
    border-radius: 0.3125em;
    background-color: var(--white, #ffffff);
    box-sizing: border-box;
    z-index: 10;
    list-style-type: none;
    padding-left: 0;
  }

  .comboboxListbox li {
    padding: 0.3125em 0.625em;
    cursor: pointer;
    background-color: var(--white, #ffffff);
    color: var(--black, #262626);
  }

  .comboboxListbox li[aria-selected="true"] {
    background-color: var(--purple-700, #5941a9);
    color: var(--white, #ffffff);
  }

  .comboboxListbox li:hover {
    background-color: var(--focus-color, #9c27b0);
    color: var(--white, #ffffff);
  }

  .helpText {
    margin-top: 0.625em;
    color: var(--gray-700, #696868);
    font-size: var(--text-sm, 0.875rem);
    margin: 0;
    padding: 0;
  }

  .resultCount {
    margin-top: 0.625em;
    color: var(--purple-700, #5941a9);
    font-size: var(--text-xs, 0.8rem);
    margin: 0;
    padding: 0;
    margin-bottom: 0.5em;
  }

  .selectedOption {
    background-color: var(--purple-700, #5941a9);
    color: var(--white, #ffffff);
  }
`;

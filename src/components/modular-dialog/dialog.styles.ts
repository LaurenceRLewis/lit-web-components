import { css } from 'lit';

export const DialogStyles = css`
  .dialog-wrapper dialog {
    border: 2px solid var(--purple-700);
    min-height: 200px;
    padding: 1em 1em 2em;
    position: relative;
    z-index: 1000;
  }

  .dialog-wrapper dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .dialog-heading {
    color: var(--purple-700);
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 0;
  }

  .dialog-content {
    outline: none;
  }

  .dialog-content:focus-visible {
    outline: 3px solid var(--purple-700);
  }

  button.close-button {
    background-color: var(--purple-700);
    color: var(--white);
    border: none;
    border-radius: 1em;
    padding: 1em 2em;
    transition: background-color 0.3s;
  }

  button.close-button:hover {
    background-color: var(--purple-500);
  }

  button.close-button:focus {
    outline: none;
  }

  button.close-button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--white), 0 0 0 5px var(--purple-300);
  }
`;

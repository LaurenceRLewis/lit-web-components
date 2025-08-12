import { css } from 'lit';

export const modalDialogStyles = css`
  :host {
    --purple-900: #4338ca;
    --purple-700: #5941a9;
    --purple-500: #7b61c4;
    --purple-300: #a886e5;
    --purple-100: #d3beff;
    --white: #ffffff;
    --black: #262626;
    font-family: Aptos, Bierstadt, "Segoe UI", -apple-system, BlinkMacSystemFont,
      Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    line-height: 1.5;
    display: inline-block;
    position: relative;
  }

  .sideSheetButton {
    background-color: var(--purple-900);
    color: var(--white);
    padding: 10px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    width: auto;
  }

  .sideSheetButton:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--purple-100);
  }
  .sideSheetButton:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--purple-900);
  }

  /* Fixed layer that contains BOTH overlay and dialog to guarantee stacking */
  .modalLayer {
    position: fixed;
    inset: 0;
    /* very high to clear any page-level overlays */
    z-index: 2147483000;
  }
  /* Inside the layer, keep scrim below and dialog above */
  .modalLayer .overlay { z-index: 0; }
  .modalLayer .standardDialog,
  .modalLayer .sheet { z-index: 1; }

  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 998; /* overridden by .modalLayer rule */
  }

  /* SHEET (right drawer) */
  .sheet {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100%;
    background-color: var(--white);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 999;
    transition: right 0.3s ease-in-out;
  }
  .sheet.open { right: 0; }

  /* STANDARD centered modal */
  .standardDialog {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 70%;
    max-width: 640px;
    height: 80%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--white);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 999;
  }

  .hidden { display: none; }

  .sheetHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--purple-700);
    color: var(--white);
  }

  .sheetHeading {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .sheetHeading[tabindex="-1"] {
    border: none;
    outline: none;
    box-shadow: none;
  }

  .closeButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    min-height: 48px;
    min-width: 48px;
    border-radius: 50%;
    background-color: var(--white);
    color: purple;
    font-weight: bold;
    font-size: 1.25rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  .closeButton:hover,
  .closeButton:focus {
    background-color: rgba(255,255,255,0.8);
  }
  .closeButton:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--purple-900), 0 0 0 4px var(--white);
  }

  .sheetContent { padding: 1rem; }

  .contentContainer {
    height: calc(100% - 64px); /* approx header height */
    overflow-y: auto;
    padding: 16px;
    outline: none;
  }

  .sheetContent[tabindex="0"]:focus {
    border: 2px solid var(--purple-900);
  }
`;

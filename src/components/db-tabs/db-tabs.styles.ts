import { css } from 'lit';

export const tabsStyles = css`
  .tabContainer {
    max-width: 800px;
    margin: 0 auto;
  }

  .tabList {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-left: 0;
    list-style-type: none;
    margin: 0;
  }

  .tab {
    flex-grow: 1;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    border-bottom: 3px solid transparent;
  }

  .tab:focus-visible {
    border-bottom: 3px solid green;
  }

  .tab[aria-selected="true"]:focus-visible {
    border-bottom: 3px solid blue;
  }

  .tab[aria-selected="true"] {
    font-weight: bold;
    border-bottom-color: #9c27b0;
    background-color: #d1cbdb;
  }

  .tabPanel {
    padding: 15px;
    border: 1px solid #ccc;
    border-top: none;
  }

  .tabPanel[hidden] {
    display: none;
  }

  .tabPanel h3 {
    margin-top: 0;
  }

  .accordionButton {
    width: 100%;
    text-align: left;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    background: none;
    outline: none;
    cursor: pointer;
  }

  .accordionButton + .accordionTabPanel {
    border-top: none;
  }

  .accordionButton:focus-visible {
    border-color: green;
  }

  .accordionButton[aria-expanded="true"] {
    font-weight: bold;
    background-color: #d1cbdb;
  }

  .accordionButton[aria-expanded="true"]:focus-visible {
    border-color: blue;
  }

  .accordionTabPanel[hidden] {
    display: none;
  }
`;
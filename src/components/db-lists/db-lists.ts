import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ListType = 'ul' | 'ol';
type Scenario =
  | 'Default'
  | 'Div with no role'
  | 'Missing opening tag'
  | 'Missing closing tag'
  | 'Slot list items';

@customElement('db-lists')
export class DbLists extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 1rem;
    }

    ul,
    ol,
    div[role='list'],
    div {
      padding-left: 1.25rem;
      margin: 0;
    }

    li,
    div > div {
      margin-bottom: 0.5rem;
    }
  `;

  @property({ type: String }) listType: ListType = 'ul';
  @property({ type: String }) scenario: Scenario = 'Default';

  private get items() {
    return ['Toyota', 'Ford', 'BMW', 'Hyundai', 'Mazda'];
  }

  renderListItems() {
    if (this.scenario === 'Slot list items') {
      return html`<slot></slot>`;
    }

    return this.items.map(item => html`<li>${item}</li>`);
  }

  render() {
    switch (this.scenario) {
      case 'Div with no role':
        return html`<div>${this.renderListItems()}</div>`;

      case 'Missing opening tag':
        return html`${this.renderListItems()}</${this.listType}>`;

      case 'Missing closing tag':
        return this.listType === 'ul'
          ? html`<ul>${this.renderListItems()}`
          : html`<ol>${this.renderListItems()}`;

      case 'Slot list items':
        return this.listType === 'ul'
          ? html`<ul><slot></slot></ul>`
          : html`<ol><slot></slot></ol>`;

      case 'Default':
      default:
        return this.listType === 'ul'
          ? html`<ul>${this.renderListItems()}</ul>`
          : html`<ol>${this.renderListItems()}</ol>`;
    }
  }
}

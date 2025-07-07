import { LitElement, html, css, nothing } from 'lit';
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
    div[role='list'] {
      padding: 1rem;
      margin: 0;
    }

    li {
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
    const isSlot = this.scenario === 'Slot list items';
    const isDivNoRole = this.scenario === 'Div with no role';
    const missingOpening = this.scenario === 'Missing opening tag';
    const missingClosing = this.scenario === 'Missing closing tag';

    if (isDivNoRole) {
      return html`<div>${this.renderListItems()}</div>`;
    }

    if (missingOpening) {
      return html`${this.renderListItems()}</${this.listType}>`;
    }

    if (missingClosing) {
      if (this.listType === 'ul') {
        return html`<ul>${this.renderListItems()}`;
      } else {
        return html`<ol>${this.renderListItems()}`;
      }
    }

    if (this.listType === 'ul') {
      return html`<ul>${this.renderListItems()}</ul>`;
    } else {
      return html`<ol>${this.renderListItems()}</ol>`;
    }
  }
}

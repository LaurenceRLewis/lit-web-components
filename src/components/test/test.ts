import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @property() name = 'Laurence';

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border: 2px solid rebeccapurple;
    }
  `;

  render() {
    return html`<p>Hello, ${this.name}</p>`;
  }
}
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("modular-button")
export class ModularButton extends LitElement {
  static styles = css`
    button {
      color: #fff;
      background-color: #5941a9;
      border: none;
      border-radius: 1em;
      padding: 1em 2em;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #7b61c4;
    }

    button:focus {
      outline: none;
    }

    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px #fff, 0 0 0 5px #a886e5;
    }
  `;

  @property({ type: Object }) buttonTypes: Partial<
    Record<"button" | "submit" | "reset", boolean>
  > = {
    button: true,
  };

  @property({ type: String }) label: string = "My Button";

  @state() private resolvedType: "button" | "submit" | "reset" = "button";

  updated() {
    const types = Object.entries(this.buttonTypes) as [string, boolean][];
    for (const [key, value] of types) {
      if (value) {
        this.resolvedType = key as "button" | "submit" | "reset";
        break;
      }
    }
  }

  render() {
    return html`
      <button type=${this.resolvedType}>
        ${this.label}
      </button>
    `;
  }
}
import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DateFormatter } from "@internationalized/date";

@customElement("native-datepicker")
export class NativeDatePicker extends LitElement {
  static styles = css`
    :host {
      --purple-900: #4338ca;
      --purple-700: #5941a9;
      --purple-500: #7b61c4;
      --purple-300: #a886e5;
      --purple-100: #d3beff;
      --white: #ffffff;
      --black: #262626;

      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
    }

    .datePickerContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: var(--white);
      padding: 2em;
      border: 1px solid var(--purple-300);
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 2em;
    }

    label {
      margin-bottom: 1em;
      font-weight: bold;
      color: var(--purple-900);
    }

    input[type="datetime-local"],
    input[type="date"],
    input[type="time"] {
      padding: 0 .5em;
      border: 1px solid var(--purple-300);
      border-radius: 6px;
      width: 280px;
      height: 56px;
      font-size: 1.125rem;
      color: var(--black);
      background-color: var(--white);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus {
      border-color: var(--purple-500);
      box-shadow: 0 0 6px rgba(67, 56, 202, 0.5);
      outline: none;
    }

    /* Chrome/Safari calendar & clock icon styling */
    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    input[type="time"]::-webkit-calendar-picker-indicator {
      width: 1.75em;
      height: 1.75em;
      cursor: pointer;
      filter: invert(20%) sepia(50%) saturate(400%) hue-rotate(220deg);
    }

    /* Optional: Increase internal font size in WebKit */
    input::-webkit-datetime-edit-fields-wrapper,
    input::-webkit-datetime-edit {
      font-size: 1.125rem;
    }

    /* Firefox fallback font size support */
    @supports (-moz-appearance: none) {
      input[type="date"],
      input[type="datetime-local"],
      input[type="time"] {
        font-size: 1.125rem;
      }
    }

    .buttonGroup {
      display: flex;
      gap: 1em;
      margin-top: 1em;
    }

    .setButton {
      color: #fff;
      background-color: var(--purple-700);
      border: none;
      border-radius: .5em;
      padding: .5em 1em;
      font-size: 1rem;
      transition: background-color 0.3s;
    }

    .setButton:hover {
      background-color: var(--purple-500);
    }

    .setButton:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px #fff, 0 0 0 5px var(--purple-300);
    }

    .infoSections {
      display: flex;
      gap: 2em;
      margin-top: 2em;
    }
  `;

  @property({ type: String })
  mode: "date" | "datetime" | "time" = "date";

  @state() private date = "";
  @state() private confirmationMessage = "";

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.date = target.value;
    this.confirmationMessage = "";
  }

  private handleResetDate() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");

    this.date =
      this.mode === "datetime"
        ? `${yyyy}-${mm}-${dd}T${hh}:${mi}`
        : this.mode === "date"
        ? `${yyyy}-${mm}-${dd}`
        : `${hh}:${mi}`;

    this.confirmationMessage = "";
  }

  render() {
    const inputType =
      this.mode === "datetime"
        ? "datetime-local"
        : this.mode === "time"
        ? "time"
        : "date";

    return html`
      <h1>HTML Datepicker</h1>
      <div class="datePickerContainer">
        <label for="date-picker"
          >Select a
          ${this.mode === "datetime"
            ? "date and time"
            : this.mode === "time"
            ? "time"
            : "date"}:</label
        >
        <input
          id="date-picker"
          type=${inputType}
          .value=${this.date}
          @change=${this.handleChange}
        />

        <div class="buttonGroup">
          <button type="reset" @click=${this.handleResetDate} class="setButton">
            Reset to Today
          </button>
        </div>

        ${this.confirmationMessage
          ? html`<div class="successMessage">
              <strong>${this.confirmationMessage}</strong>
            </div>`
          : nothing}
      </div>

      <div class="infoSections">
        <keyboard-help></keyboard-help>
      </div>
    `;
  }
}

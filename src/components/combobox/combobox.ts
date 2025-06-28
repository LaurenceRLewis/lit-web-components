import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { townsAndCities } from "./combobox.data.js";
import { comboboxStyles } from "./combobox.styles";
import ariaAnnounce from "../../utils/ariaAnnounce.js";

@customElement("aria-combobox")
export class AriaCombobox extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        line-height: 1.5;
      }
    `,
    comboboxStyles,
  ];

  @property({ type: String }) showHelpText: "Yes" | "No" = "No";
  @property({ type: Boolean }) showToggleButton = true;
  @property({ type: String }) showAllOptionsAfterSelection: "Yes" | "No" =
    "Yes";

  @state() private inputValue = "";
  @state() private showOptions = false;
  @state() private options: string[] = townsAndCities;
  @state() private selectedIndex = -1;
  @state() private lastSelectedValue: string | null = null;

  private filterOptions(value: string): string[] {
    return townsAndCities.filter((city: string) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );
  }

  private toggleOptions(): void {
    if (!this.showOptions) {
      if (
        this.showAllOptionsAfterSelection === "Yes" &&
        this.lastSelectedValue
      ) {
        this.options = townsAndCities;
        this.selectedIndex = townsAndCities.findIndex(
          (c: string) => c === this.lastSelectedValue
        );
      } else if (this.lastSelectedValue) {
        this.options = [this.lastSelectedValue];
        this.selectedIndex = 0;
      } else {
        this.options = this.filterOptions(this.inputValue);
        this.selectedIndex = 0;
      }
    }
    this.showOptions = !this.showOptions;
    ariaAnnounce(
      `${this.options.length} of ${townsAndCities.length} results found`
    );
  }

  private handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;
    this.options = this.filterOptions(this.inputValue);
    this.selectedIndex = 0;
    this.showOptions = true;
    ariaAnnounce(
      `${this.options.length} of ${townsAndCities.length} results found`
    );
  }

  private handleClick(value: string): void {
    this.inputValue = value;
    this.lastSelectedValue = value;
    this.showOptions = false;
    this.selectedIndex = -1;
    ariaAnnounce(`Selected ${value}`);
  }

  private async handleKeyDown(e: KeyboardEvent): Promise<void> {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (!this.showOptions) {
        // Same logic as toggleOptions
        if (
          this.showAllOptionsAfterSelection === "Yes" &&
          this.lastSelectedValue
        ) {
          this.options = townsAndCities;
        } else if (this.lastSelectedValue) {
          this.options = this.filterOptions(this.lastSelectedValue);
        } else {
          this.options = this.filterOptions(this.inputValue);
        }

        this.selectedIndex = this.options.findIndex(
          (city) => city === this.lastSelectedValue
        );

        this.showOptions = true;

        ariaAnnounce(
          `${this.options.length} of ${townsAndCities.length} results found`
        );

        await this.updateComplete;

        const selected = this.renderRoot.querySelector(".selectedOption");
        selected?.scrollIntoView({ block: "nearest" });
      } else {
        // Move focus to next option
        this.selectedIndex = (this.selectedIndex + 1) % this.options.length;

        await this.updateComplete;

        const selected = this.renderRoot.querySelector(".selectedOption");
        selected?.scrollIntoView({ block: "nearest" });
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.showOptions ||= true;
      this.selectedIndex =
        (this.selectedIndex - 1 + this.options.length) % this.options.length;

      await this.updateComplete;

      const selected = this.renderRoot.querySelector(".selectedOption");
      selected?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && this.selectedIndex !== -1) {
      this.handleClick(this.options[this.selectedIndex]);
    } else if (e.key === "Escape") {
      this.showOptions = false;
      this.selectedIndex = -1;
    }
  }

  render() {
    const inputId = "combobox-input";
    const resultCountId = "result-count";
    const helpTextId = "datalistHelpText";
    const activeDescendant =
      this.selectedIndex === -1 ? "" : `option-${this.selectedIndex}`;
    const describedBy = [
      this.showHelpText === "Yes" ? helpTextId : "",
      this.showOptions ? resultCountId : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <h1>ARIA Combobox (List)</h1>
      <div class="comboboxContainer">
        <label id="combobox-label" for=${inputId}
          >Australian cities and towns</label
        >

        ${this.showHelpText === "Yes"
          ? html`<p id=${helpTextId} class="helpText">Help text</p>`
          : null}
        ${this.showOptions
          ? html`<p id=${resultCountId} class="resultCount">
              ${this.options.length} results found
            </p>`
          : null}

        <div class="comboboxWrapper">
          <input
            id=${inputId}
            class="comboboxInput"
            type="text"
            .value=${this.inputValue}
            role="combobox"
            aria-autocomplete="list"
            aria-controls="combobox-listbox"
            aria-expanded=${this.showOptions}
            aria-activedescendant=${activeDescendant}
            aria-labelledby="combobox-label"
            aria-describedby=${describedBy}
            autocomplete="off"
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
          />

          ${this.showToggleButton
            ? html`
                <button
                  class="toggleButton"
                  @click=${this.toggleOptions}
                  aria-label="Toggle list of Australian towns and cities"
                  aria-controls="combobox-listbox"
                  aria-expanded=${this.showOptions}
                  tabindex="-1" 
                >
                  ${this.showOptions ? "▲" : "▼"}
                </button>
              `
            : null}
        </div>

        ${this.showOptions
          ? html`
              <ul
                id="combobox-listbox"
                class="comboboxListbox"
                role="listbox"
                aria-label="Australian towns and cities"
              >
                ${this.options.map(
                  (option: string, index: number) =>
                    html`
                      <li
                        id="option-${index}"
                        class=${classMap({
                          selectedOption: index === this.selectedIndex,
                        })}
                        role="option"
                        aria-selected=${index === this.selectedIndex}
                        @click=${() => this.handleClick(option)}
                      >
                        ${option}
                      </li>
                    `
                )}
              </ul>
            `
          : null}
      </div>
    `;
  }
}

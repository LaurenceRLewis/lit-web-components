import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./modular-tab-list";
import "./modular-tab";
import "./modular-tab-panel";
import { tabsStyles } from "./modular-tabs.styles";

interface TabItem {
  id: string;
  title: string;
  content: string;
}

@customElement("modular-tabs")
export class ModularTabs extends LitElement {
  static styles = [
    tabsStyles,
    css`
      :host {
        display: block;
        font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        line-height: 1.5;
      }
    `,
  ];

  @property({ type: Array }) tabs: TabItem[] = [];
  @property({ type: String }) triggerActivation: "manual" | "automated" =
    "manual";
  @property({ type: String }) textColor = "rgba(0, 0, 0, 1)";
  @property({ type: Object }) tabBackground = {
    default: "rgba(209, 203, 219, 1)",
    selected: "rgba(156, 39, 176, 1)",
  };

  @state() private selectedTabId: string | null = null;
  private _hasSelectedFirstTab = false;

  updated() {
    if (
      !this._hasSelectedFirstTab &&
      this.tabs.length > 0 &&
      !this.selectedTabId
    ) {
      this.selectedTabId = this.tabs[0].id;
      this._hasSelectedFirstTab = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("tab-selected", (e: Event) => {
      const customEvent = e as CustomEvent;
      this.selectedTabId = customEvent.detail.id;
    });
  }

  render() {
    return html`
      <div class="tabContainer">
        <modular-tab-list ariaLabel="Tabs">
          ${this.tabs.map(
            (tab) => html`
              <modular-tab
                id=${tab.id}
                .selected=${this.selectedTabId === tab.id}
                .textColor=${this.textColor}
                .background=${this.tabBackground}
                .triggerActivation=${this.triggerActivation}
              >
                ${tab.title}
              </modular-tab>
            `
          )}
        </modular-tab-list>
        ${this.tabs.map(
          (tab) => html`
            <modular-tab-panel
              id="panel-${tab.id}"
              .labelledBy=${tab.id}
              ?hidden=${this.selectedTabId !== tab.id}
              .tabindex=${this.selectedTabId === tab.id ? 0 : -1}
              class="tabPanel"
            >
              ${tab.content}
            </modular-tab-panel>
          `
        )}
      </div>
    `;
  }
}

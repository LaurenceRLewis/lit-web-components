import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { tabsStyles } from './db-tabs.styles';

interface TabItem {
  id: string;
  title: string;
  content: unknown;
}

interface ColorSet {
  default: string;
  selected: string;
}

@customElement('db-wc-tabs')
export class WcTabs extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        line-height: 1.5;
      }
    `,
    tabsStyles,
  ];

  @property({ type: Array }) tabs: TabItem[] = [];
  @property({ type: Boolean }) tabPanelTabindex = false;
  @property({ type: String }) triggerActivation: 'manual' | 'automated' = 'manual';

  // Fix: prevent Lit from trying to reflect object to attribute
  @property({ attribute: false }) textColor: ColorSet = {
    default: 'rgba(0, 0, 0, 1)',
    selected: 'rgba(255, 255, 255, 1)',
  };

  @property({ attribute: false }) tabBackground: ColorSet = {
    default: 'rgba(209, 203, 219, 1)',
    selected: 'rgba(156, 39, 176, 1)',
  };

  @property({ type: Number }) viewportThreshold = 400;

  @property({ type: String })
  tabAttributeMode: 'aria-selected' | 'aria-expanded' | 'aria-chosen' = 'aria-selected';

  @property({ type: String })
  tabPanelRole: 'tabpanel' | 'region' | '' = 'tabpanel';

  @state() private selectedTabId = '';
  @state() private isAccordionView = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.selectedTabId = this.tabs?.[0]?.id ?? '';
    this.updateViewMode();
    window.addEventListener('resize', this.updateViewMode);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.updateViewMode);
  }

  private updateViewMode = (): void => {
    this.isAccordionView = window.innerWidth < this.viewportThreshold;
  };

  private handleClick(id: string): void {
    this.selectedTabId = id;
  }

  private handleKeyDown(id: string, event: KeyboardEvent): void {
    const currentIndex = this.tabs.findIndex(tab => tab.id === id);
    const prevIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
    const nextIndex = (currentIndex + 1) % this.tabs.length;

    if (this.isAccordionView) {
      if (['Enter', ' '].includes(event.key)) {
        event.preventDefault();
        this.selectedTabId = id;
      }
    } else {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          this.focusTab(this.tabs[nextIndex].id);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.focusTab(this.tabs[prevIndex].id);
          break;
        case 'Home':
          event.preventDefault();
          this.focusTab(this.tabs[0].id);
          break;
        case 'End':
          event.preventDefault();
          this.focusTab(this.tabs[this.tabs.length - 1].id);
          break;
        case 'Enter':
        case ' ':
          if (this.triggerActivation === 'manual') {
            event.preventDefault();
            this.selectedTabId = id;
          }
          break;
      }
    }
  }

  private focusTab(id: string) {
    if (this.triggerActivation === 'automated') {
      this.selectedTabId = id;
    }
    const button = this.renderRoot?.querySelector(`#${id}`) as HTMLButtonElement;
    button?.focus();
  }

  private getTabAttribute(attr: string, isSelected: boolean): Record<string, string | boolean> {
    switch (attr) {
      case 'aria-expanded':
        return { 'aria-expanded': isSelected };
      case 'aria-chosen':
        return { 'aria-chosen': isSelected }; // intentionally invalid
      case 'aria-selected':
      default:
        return { 'aria-selected': isSelected };
    }
  }

  render() {
    return html`
      <div class="tabContainer">
        ${this.isAccordionView
          ? this.tabs.map(tab => html`
              <button
                id=${tab.id}
                class="accordionButton"
                aria-controls="tabpanel-${tab.id}"
                aria-expanded=${this.selectedTabId === tab.id}
                style=${styleMap({
                  color: this.selectedTabId === tab.id
                    ? this.textColor.selected
                    : this.textColor.default,
                  backgroundColor: this.selectedTabId === tab.id
                    ? this.tabBackground.selected
                    : this.tabBackground.default,
                })}
                @click=${() => this.handleClick(tab.id)}
                @keydown=${(e: KeyboardEvent) => this.handleKeyDown(tab.id, e)}
              >
                ${tab.title}
              </button>
              <div
                id="tabpanel-${tab.id}"
                class="accordionTabPanel"
                aria-labelledby=${tab.id}
                role=${this.tabPanelRole || nothing}
                ?hidden=${this.selectedTabId !== tab.id}
              >
                ${tab.content}
              </div>
            `)
          : html`
              <div class="tabList" role="tablist" aria-label="Tab widget deliberately broken for automation tool testing">
                ${this.tabs.map(tab => {
                  const attrMap = this.getTabAttribute(this.tabAttributeMode, this.selectedTabId === tab.id);
                  return html`
                    <button
                      id=${tab.id}
                      role="tab"
                      class="tab"
                      aria-controls="tabpanel-${tab.id}"
                      tabindex=${this.selectedTabId === tab.id ? 0 : -1}
                      style=${styleMap({
                        color: this.selectedTabId === tab.id
                          ? this.textColor.selected
                          : this.textColor.default,
                        backgroundColor: this.selectedTabId === tab.id
                          ? this.tabBackground.selected
                          : this.tabBackground.default,
                      })}
                      @click=${() => this.handleClick(tab.id)}
                      @keydown=${(e: KeyboardEvent) => this.handleKeyDown(tab.id, e)}
                      ...=${attrMap}
                    >
                      ${tab.title}
                    </button>
                  `;
                })}
              </div>
              ${this.tabs.map(tab => html`
                <div
                  id="tabpanel-${tab.id}"
                  class="tabPanel"
                  aria-labelledby=${tab.id}
                  role=${this.tabPanelRole || nothing}
                  ?hidden=${this.selectedTabId !== tab.id}
                  tabindex=${this.tabPanelTabindex ? 0 : nothing}
                >
                  ${tab.content}
                </div>
              `)}
            `}
      </div>
    `;
  }
}
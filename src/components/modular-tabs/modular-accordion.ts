import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './modular-accordion-item';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@customElement('wc-accordion')
export class WcAccordion extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }

    .accordion {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  `;

  @property({ type: Array }) items: AccordionItem[] = [];
  @property({ type: Boolean }) autoCollapse = false;
  @property({ type: String }) textColor = 'rgba(0, 0, 0, 1)';
  @property({ type: Object }) headerBackground = {
    default: 'rgba(209, 203, 219, 1)',
    selected: 'rgba(156, 39, 176, 1)',
  };

  private expandedId: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('accordion-toggle', this.handleToggle as EventListener);
  }

  disconnectedCallback(): void {
    this.removeEventListener('accordion-toggle', this.handleToggle as EventListener);
    super.disconnectedCallback();
  }

  private handleToggle = (event: CustomEvent<{ id: string }>) => {
    const toggledId = event.detail.id;

    if (this.autoCollapse) {
      this.expandedId = this.expandedId === toggledId ? null : toggledId;
      this.requestUpdate();
    }
  };

  render() {
    return html`
      <div class="accordion">
        ${this.items.map((item) => {
          const expanded = this.autoCollapse ? this.expandedId === item.id : undefined;
          return html`
            <wc-accordion-item
              .id=${item.id}
              .title=${item.title}
              .textColor=${this.textColor}
              .background=${this.headerBackground}
              ?forceOpen=${expanded}
            >
              ${item.content}
            </wc-accordion-item>
          `;
        })}
      </div>
    `;
  }
}
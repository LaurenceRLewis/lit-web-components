import { LitElement, html } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { tabsStyles } from './modular-tabs.styles';

@customElement('modular-tab-list')
export class ModularTabList extends LitElement {
  static styles = [tabsStyles];

  @property({ type: String }) ariaLabel = 'Tab list';
  @property({ type: String }) triggerActivation: 'manual' | 'automated' = 'manual';

  @queryAssignedElements({ flatten: true })
  private tabs!: HTMLElement[];

  private handleKeydown(event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const root = this.getRootNode() as unknown as DocumentOrShadowRoot;
    const current = root.activeElement as HTMLElement;
    const currentIndex = this.tabs.findIndex((tab) => tab === current);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
    } else if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % this.tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.tabs.length - 1;
    }

    const nextTab = this.tabs[nextIndex];
    nextTab?.focus();

    if (this.triggerActivation === 'automated') {
      nextTab?.dispatchEvent(
        new CustomEvent('tab-selected', {
          detail: { id: nextTab.id },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <div
        class="tabList"
        role="tablist"
        aria-label=${this.ariaLabel}
        aria-orientation="horizontal"
        @keydown=${this.handleKeydown}
      >
        <slot></slot>
      </div>
    `;
  }
}

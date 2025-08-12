// src/components/modular-tabs/modular-tab-panel.ts
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('modular-tab-panel')
export class ModularTabPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    [hidden] {
      display: none !important;
    }
  `;

  /** Host id should be "panel-<tabId>" (e.g., "panel-html-009878"). */
  @property({ type: String }) id = '';

  /**
   * Forwarded tab text from the container (preferred source).
   * When present, we use it directly for aria-label on the inner role="tabpanel".
   */
  @property({ type: String, reflect: true }) label = '';

  @property({ type: Boolean, reflect: true }) hidden = false;
  @property({ type: Number }) tabindex = -1;
  @property({ type: String }) ariaLabel = '';

  /** Internal cache to ensure we render an aria-label once known. */
  private _ariaLabel: string | undefined;

  /** Track the container tabs slot to react to future changes. */
  private tabsSlotEl: HTMLSlotElement | null = null;
  private onTabsSlotChange = () => this.trySyncLabelFromContainer();

  connectedCallback(): void {
    super.connectedCallback();
    // Try early (slotted relationship may not be ready yet).
    queueMicrotask(() => this.ensureAriaLabel());
    // Try again next frame in case slot distribution isn't complete.
    requestAnimationFrame(() => this.ensureAriaLabel());
  }

  firstUpdated(): void {
    this.ensureAriaLabel();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.tabsSlotEl) {
      this.tabsSlotEl.removeEventListener('slotchange', this.onTabsSlotChange);
      this.tabsSlotEl = null;
    }
  }

  updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('label')) {
      const next = (this.label || '').trim();
      if (next) {
        this._ariaLabel = next;
        this.requestUpdate();
      } else {
        this.trySyncLabelFromContainer();
      }
    }
    if (changed.has('id')) {
      this.trySyncLabelFromContainer();
    }
  }

  /** Prefer forwarded label; otherwise derive it from the container’s tabs. */
  private ensureAriaLabel(): void {
    const forwarded = (this.label || '').trim();
    if (forwarded) {
      this._ariaLabel = forwarded;
      this.requestUpdate();
      return;
    }
    this.trySyncLabelFromContainer();
  }

  /**
   * Derive the label by locating the nearest <modular-tab-container>,
   * reading its tabs slot, and using the visible text from the
   * <modular-tab> that corresponds to this panel's tabId.
   */
  private trySyncLabelFromContainer(): void {
    const tabId = this.id.startsWith('panel-') ? this.id.slice('panel-'.length) : '';
    if (!tabId) return;

    // Find the nearest container in light DOM.
    const containerEl = this.closest('modular-tab-container') as HTMLElement | null;
    if (!containerEl) {
      requestAnimationFrame(() => this.trySyncLabelFromContainer());
      return;
    }

    // Access the container's shadow root to get the tabs slot.
    const containerShadow = containerEl.shadowRoot;
    if (!containerShadow) {
      requestAnimationFrame(() => this.trySyncLabelFromContainer());
      return;
    }

    const tabsSlot = containerShadow.querySelector('slot[name="tabs"]') as HTMLSlotElement | null;
    if (!tabsSlot) {
      requestAnimationFrame(() => this.trySyncLabelFromContainer());
      return;
    }

    // Subscribe once so we update if tab text/assignment changes later.
    if (!this.tabsSlotEl) {
      this.tabsSlotEl = tabsSlot;
      this.tabsSlotEl.addEventListener('slotchange', this.onTabsSlotChange);
    }

    const tabs = tabsSlot.assignedElements({ flatten: true }) as Element[];
    // <modular-tab> host has the tab's slotted text; its *button* carries the id.
    // The container maps panel.id -> tab.id via "panel-<tab.id>", so match host by its inner button id.
    const tabHost = tabs.find((hostEl) => {
      // Find the internal button inside the tab's shadow root and match its id.
      const shadow = (hostEl as HTMLElement).shadowRoot;
      const btn = shadow?.querySelector('button[role="tab"]') as HTMLButtonElement | null;
      return btn?.id === tabId;
    });

    // Fallback: also allow matching by host id if you move the id to the host later.
    const resolvedHost = tabHost ?? tabs.find((el) => (el as HTMLElement).id === tabId);

    const visibleText = (resolvedHost?.textContent || '').trim();
    if (visibleText) {
      this._ariaLabel = visibleText;
      // Keep public `label` in sync so container & panel remain aligned.
      if (!this.label || this.label.trim() !== visibleText) {
        this.label = visibleText;
      } else {
        this.requestUpdate();
      }
    } else {
      // Try again soon; tab content may not be ready.
      requestAnimationFrame(() => this.trySyncLabelFromContainer());
    }
  }

  render() {
    // Always render aria-label="Tab name" on the role=tabpanel node when known.
    const ariaLabel = (this.label || this._ariaLabel || '').trim() || undefined;

    return html`
      <div
        id=${this.id}
        role="tabpanel"
        aria-label=${ifDefined(ariaLabel)}
        ?hidden=${this.hidden}
        tabindex=${this.tabindex}
      >
        <slot></slot>
      </div>
    `;
  }
}

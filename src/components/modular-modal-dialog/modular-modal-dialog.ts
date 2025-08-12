import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { modalDialogStyles } from './modular-modal-dialog.styles';

type DialogType = 'standard' | 'sheet';
type BackgroundAttribute = 'aria-hidden' | 'inert';

const FOCUSABLE_SEL =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

@customElement('modular-modal-dialog')
export class ModularModalDialog extends LitElement {
  static styles = [modalDialogStyles];
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** Modal mode traps focus & hides background for AT */
  @property({ type: Boolean }) modal = true;

  /** 'standard' centers; 'sheet' slides in */
  @property({ type: String }) dialogType: DialogType = 'standard';

  /** How to hide background when modal is open */
  @property({ type: String }) backgroundAttribute: BackgroundAttribute = 'aria-hidden';

  /** Heading text (focus target on open) */
  @property({ type: String }) heading = 'Sheet Dialog';

  /** Trigger button label */
  @property({ type: String }) triggerLabel = 'Open Sheet';

  /** Two-way open state if you want to control externally */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Container whose children get aria-hidden/inert (default body) */
  @property({ attribute: false }) rootNode?: HTMLElement;

  @state() private contentNeedsScrolling = false;

  @query('#sheetHeading') private headingEl!: HTMLElement;
  @query('#dialogContainer') private dialogEl!: HTMLElement;
  @query('#contentContainer') private contentEl!: HTMLElement;
  @query('#openButton') private openBtn!: HTMLButtonElement;

  private lastFocused: Element | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.handleKeydown = this.handleKeydown.bind(this);
    window.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback(): void {
    window.removeEventListener('keydown', this.handleKeydown);
    super.disconnectedCallback();
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open) this.close();
  }

  /** Open handler (captures true trigger, even if external calls later toggle .open) */
  private openDialog = (e?: Event) => {
    // Prefer the real triggering control if present; fall back to activeElement.
    const candidate =
      (e?.currentTarget as Element | null) ??
      ((this.getRootNode() as Document | ShadowRoot).activeElement ?? document.activeElement);
    this.lastFocused = candidate instanceof Element ? candidate : null;

    this.open = true; // afterOpen runs in updated()
  };

  private close = () => {
    this.open = false; // afterClose runs in updated()
  };

  private trapFocus(e: KeyboardEvent) {
    if (!this.open || !this.modal) return;
    if (e.key !== 'Tab') return;

    const within = this.dialogEl;
    if (!within) return;

    const nodes = within.querySelectorAll<HTMLElement>(FOCUSABLE_SEL);
    const slotEls = Array.from(this.renderRoot.querySelectorAll('slot'))
      .flatMap(s => s.assignedElements({ flatten: true }))
      .flatMap(el => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SEL)));

    const focusable = [...Array.from(nodes), ...slotEls].filter(
      el => (el as HTMLElement).offsetParent !== null
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const active = (this.shadowRoot?.activeElement ?? document.activeElement) as Element | null;

    if (e.shiftKey) {
      if (active === first) {
        (last as HTMLElement).focus();
        e.preventDefault();
      }
    } else {
      if (active === last) {
        (first as HTMLElement).focus();
        e.preventDefault();
      }
    }
  }

  private focusFirstInDialog() {
    const within = this.dialogEl;
    if (!within) return;
    const nodes = within.querySelectorAll<HTMLElement>(FOCUSABLE_SEL);
    const first = Array.from(nodes).find(el => el.offsetParent !== null) || this.headingEl;
    first?.focus?.();
  }

  private applyBackgroundHiding(isOpen: boolean) {
    const useModal = this.modal;
    const attr = this.backgroundAttribute;
    const container = this.rootNode ?? document.body;

    const host =
      this.getRootNode() instanceof ShadowRoot
        ? (this.getRootNode() as ShadowRoot).host
        : (this as Element);

    Array.from(container.children).forEach(child => {
      // Skip our host and Storybook chrome
      if (child === host || child.id === 'storybook-root') return;

      if (useModal && isOpen) {
        if (attr === 'aria-hidden') {
          child.setAttribute('aria-hidden', 'true');
          child.removeAttribute('inert');
        } else {
          child.setAttribute('inert', '');
          child.removeAttribute('aria-hidden');
        }
      } else {
        child.removeAttribute('aria-hidden');
        child.removeAttribute('inert');
      }
    });
  }

  private overlayClick = () => {
    // Do not close; match React behavior: move focus inside dialog
    this.focusFirstInDialog();
  };

  /** Called when `open` flips true */
  private async afterOpen() {
    await this.updateComplete;

    // Focus heading
    this.headingEl?.focus();

    // Make content focusable if it scrolls
    if (this.contentEl) {
      const needs = this.contentEl.scrollHeight > this.contentEl.clientHeight;
      this.contentNeedsScrolling = needs;
      await this.updateComplete;
      if (needs) this.contentEl.setAttribute('tabindex', '0');
      else this.contentEl.removeAttribute('tabindex');
    }

    // Hide / inert background if modal
    this.applyBackgroundHiding(true);
  }

  /** Called when `open` flips false */
  private async afterClose() {
    // Cleanup content tabindex & restore background
    this.contentEl?.removeAttribute('tabindex');
    this.applyBackgroundHiding(false);

    // Wait for DOM to settle (modalLayer removed) then restore focus robustly
    await this.updateComplete;
    await new Promise<void>(r => requestAnimationFrame(() => r()));

    let target = (this.lastFocused as HTMLElement) || this.openBtn || null;
    if (!(target && document.contains(target))) {
      // Last resort: focus the host
      this.setAttribute('tabindex', '-1');
      (this as unknown as HTMLElement).focus();
      this.removeAttribute('tabindex');
      return;
    }
    target.focus();
  }

  render() {
    const isStandard = this.dialogType === 'standard';
    const containerClasses = [
      isStandard ? 'standardDialog' : 'sheet',
      this.open ? 'open' : 'hidden',
    ].join(' ');

    return html`
      <button id="openButton" class="sideSheetButton" @click=${this.openDialog}>
        ${this.triggerLabel}
      </button>

      ${this.open ? html`
        <div class="modalLayer">
          ${this.modal ? html`
            <div class="overlay" @click=${this.overlayClick}></div>
          ` : nothing}

          <div
            id="dialogContainer"
            class=${containerClasses}
            role="dialog"
            aria-labelledby="sheetHeading"
            aria-modal=${ifDefined(this.modal ? 'true' : undefined)}
            aria-hidden=${ifDefined(this.open ? undefined : 'true')}
            @keydown=${this.trapFocus}
          >
            <div class="sheetHeader">
              <h2 id="sheetHeading" class="sheetHeading" tabindex="-1">${this.heading}</h2>
              <button class="closeButton" @click=${this.close} aria-label="Close dialog">
                <svg aria-hidden="true" width="48" height="48" viewBox="0 0 48 48" fill="none"
                     preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 36L36 12M12 12L36 36"
                        stroke="#7B61C4" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <div
              id="contentContainer"
              class="sheetContent contentContainer"
              tabindex=${ifDefined(this.contentNeedsScrolling ? '0' : undefined)}
            >
              <slot>
                ${this.dialogType === 'standard'
                  ? html`<modular-standard-dialog-content></modular-standard-dialog-content>`
                  : html`<modular-sheet-dialog-content></modular-sheet-dialog-content>`}
              </slot>
            </div>
          </div>
        </div>
      ` : nothing}
    `;
  }

  /** Centralized reactions when `open` changes, covering internal and external toggles */
  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      const wasOpen = changed.get('open') as boolean | undefined;
      if (!wasOpen && this.open) {
        // false -> true
        this.afterOpen();
      } else if (wasOpen && !this.open) {
        // true -> false
        this.afterClose();
      }
    }
  }
}

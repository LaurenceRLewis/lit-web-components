import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DialogStyles } from './dialog.styles';
import { DesignTokens } from '../../styles/design-tokens';

@customElement('dialog-modal')
export class DialogModal extends LitElement {
  static styles = [DesignTokens, DialogStyles];

  @property({ type: Boolean }) ShowOpenDialog = false;
  @property({ type: String }) showModal: 'Yes' | 'No' = 'Yes';
  @property({ type: String }) heading = 'Dialog Heading';
  @property({ type: String }) focusManagement: string = 'Focus is not set';
  @property({ type: Boolean }) useAutoFocus = false;

  @query('dialog') dialogRef!: HTMLDialogElement;
  @query('.dialog-heading') headingRef!: HTMLElement;
  @query('.dialog-content') contentRef!: HTMLElement;
  @query('.fake-link') fakeLinkRef!: HTMLAnchorElement;
  @query('.close-button') closeButtonRef!: HTMLButtonElement;

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      this.toggleDialog();
    }
  }

  toggleDialog() {
    if (this.ShowOpenDialog) {
      if (this.showModal === 'Yes') {
        this.dialogRef.showModal();
      } else {
        this.dialogRef.show();
      }

      this.handleFocus();
    } else {
      this.dialogRef.close();
    }
  }

  handleFocus() {
    this.headingRef?.setAttribute('tabIndex', '-1');
    this.contentRef?.setAttribute('tabIndex', '-1');

    if (this.useAutoFocus) {
      this.clearAutoFocus();

      switch (this.focusManagement) {
        case 'focus is set to the new div container':
          this.headingRef?.setAttribute('autofocus', '');
          break;
        case 'focus is set to the dialog heading':
          this.contentRef?.setAttribute('autofocus', '');
          break;
        case 'focus is set to the fake link':
          this.fakeLinkRef?.focus();
          break;
        case 'focus is set to the close button':
          this.closeButtonRef?.focus();
          break;
        case 'focus is set to the first focusable element inside the dialog':
          this.dialogRef?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )?.setAttribute('autofocus', '');
          break;
      }
    } else {
      switch (this.focusManagement) {
        case 'focus is set to the new div container':
          this.headingRef?.focus();
          break;
        case 'focus is set to the dialog heading':
          this.contentRef?.focus();
          break;
        case 'focus is set to the fake link':
          this.fakeLinkRef?.focus();
          break;
        case 'focus is set to the close button':
          this.closeButtonRef?.focus();
          break;
        case 'focus is set to the first focusable element inside the dialog':
          this.dialogRef?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )?.focus();
          break;
      }
    }
  }

  clearAutoFocus() {
    this.headingRef?.removeAttribute('autofocus');
    this.contentRef?.removeAttribute('autofocus');
    const first = this.dialogRef?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.removeAttribute('autofocus');
  }

  handleFakeLinkClick(e: Event) {
    e.preventDefault();
  }

  handleClose() {
    this.ShowOpenDialog = false;
    const event = new CustomEvent('close-dialog', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="dialog-wrapper">
        <dialog class="dialog">
          <div class="dialog-content" tabindex="-1">
            <h2 class="dialog-heading" tabindex="-1">${this.heading}</h2>
            <slot></slot>
            <p>Testing variations of the HTML dialog using Props.</p>
            <p>
              This is a
              <a href="#" @click=${this.handleFakeLinkClick} class="fake-link">Fake Link</a>
            </p>
            <button type="button" class="close-button" @click=${this.handleClose}>Close</button>
          </div>
        </dialog>
      </div>
    `;
  }
}

import { html, render } from 'lit';
import type { Meta } from '@storybook/web-components';
import './shadow-boundaries.js';

/**
 * Serialize the full host + shadow DOM content
 */
function serializeHostAndShadowDom(hostSelector: string): string {
  const host = document.querySelector(hostSelector);
  if (!host) return 'Host not found';

  const clone = host.cloneNode(true) as HTMLElement;
  const shadow = host.shadowRoot ? host.shadowRoot.innerHTML : '';

  if (shadow) {
    const template = document.createElement('template');
    template.setAttribute('shadowroot', 'open');
    template.innerHTML = shadow;
    clone.appendChild(template);
  }

  const container = document.createElement('div');
  container.appendChild(clone);

  return container.innerHTML
    .replace(/></g, '>\n<')
    .replace(/^/gm, '  ');
}

/**
 * Summarize relevant accessibility attributes in host + shadow
 */
function summarizeAccessibilityAttributes(hostSelector: string): string {
  const host = document.querySelector(hostSelector);
  if (!host) return 'Host not found';

  const all: Element[] = [
    host,
    ...Array.from(host.shadowRoot?.querySelectorAll('*') ?? [])
  ];
  const rows: string[] = [];

  all.forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    const attrs = ['id', 'for', 'role', 'aria-label', 'aria-labelledby']
      .map((attr) => {
        const val = el.getAttribute(attr);
        return val ? `${attr}="${val}"` : '';
      })
      .filter(Boolean)
      .join(' ');
    if (attrs) {
      rows.push(`<${el.tagName.toLowerCase()}> → ${attrs}`);
    }
  });

  return rows.length
    ? rows.map((line) => '  ' + line).join('\n')
    : '  No relevant ARIA or label attributes found.';
}

/**
 * Wrapper to render demo + code + accessibility summary
 */
function withCodeAndA11yPreview(selector: string, template: ReturnType<typeof html>): HTMLElement {
  const container = document.createElement('section');

  render(
    html`
      ${template}
      <pre><code id="code-preview" style="margin-top: 1rem; display: block; padding: 0.5rem; background: #f9f9f9; border: 1px solid #ccc; font-size: 0.875rem;"></code></pre>
      <details style="margin-top: 0.5rem;">
        <summary style="cursor: pointer; font-weight: bold;">Accessibility Summary</summary>
        <pre id="a11y-preview" style="margin-top: 0.5rem; display: block; padding: 0.5rem; background: #f4f4f4; border: 1px solid #ddd; font-size: 0.875rem;"></pre>
      </details>
    `,
    container
  );

  setTimeout(() => {
    const codeBlock = container.querySelector('#code-preview')!;
    const a11yBlock = container.querySelector('#a11y-preview')!;
    codeBlock.textContent = serializeHostAndShadowDom(selector);
    a11yBlock.textContent = summarizeAccessibilityAttributes(selector);
  }, 0);

  return container;
}

export default {
  title: 'Deliberately broken for testing/Accessible Name Patterns',
  parameters: {
    docsOnly: false,
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta;

/* ========== STANDARD DOM (DO) ========== */

export const Standard_LabelAndInput = () =>
  withCodeAndA11yPreview(
    'input#std-1',
    html`
      <h3>Standard DOM — Label & Input (for/id)</h3>
      <label for="std-1">Your name</label>
      <input id="std-1" type="text" />
    `
  );

export const Standard_AriaLabelledby = () =>
  withCodeAndA11yPreview(
    'input[aria-labelledby]',
    html`
      <h3>Standard DOM — aria-labelledby</h3>
      <span id="std-lbl-2">Your name</span>
      <input type="text" aria-labelledby="std-lbl-2" />
    `
  );

/* ========== STANDARD DOM (DON'T) ========== */

export const Standard_LabelWithoutFor = () =>
  withCodeAndA11yPreview(
    'input#std-3',
    html`
      <h3>Standard DOM — Label without for (DON'T)</h3>
      <label>Your name</label>
      <input id="std-3" type="text" />
    `
  );

export const Standard_MismatchedForId = () =>
  withCodeAndA11yPreview(
    'input#bar',
    html`
      <h3>Standard DOM — Mismatched for/id (DON'T)</h3>
      <label for="foo">Your name</label>
      <input id="bar" type="text" />
    `
  );

/* ========== SHADOW DOM INPUT (DON'T) ========== */

export const Shadow_InputWithStandardLabel_Dont = () =>
  withCodeAndA11yPreview(
    'shadow-input-element',
    html`
      <h3>Shadow DOM — Standard label + Shadow input (DON'T)</h3>
      <label for="shared-id">Your name</label>
      <shadow-input-element inputid="shared-id"></shadow-input-element>
    `
  );

export const Shadow_SlottedStandardLabel_Naive_Dont = () =>
  withCodeAndA11yPreview(
    'shadow-input-element',
    html`
      <h3>Shadow DOM — Slotted Standard label (naive) (DON'T)</h3>
      <shadow-input-element inputid="shared-id">
        <label slot="label" for="shared-id">Your name</label>
      </shadow-input-element>
    `
  );

/* ========== SHADOW DOM INPUT (DO) ========== */

export const Shadow_SlottedStandardLabel_Synthesized_Do = () =>
  withCodeAndA11yPreview(
    'shadow-input-element',
    html`
      <h3>Shadow DOM — Slotted Standard label (synthesized) (DO)</h3>
      <shadow-input-element inputid="shared-id" .useSlotAsAccessibleName=${true}>
        <label slot="label" for="shared-id">Your name</label>
      </shadow-input-element>
    `
  );

/* ========== TWO SHADOW ROOTS ========== */

export const Shadow_TwoRoots_ForwardedLabel_Naive_Dont = () =>
  withCodeAndA11yPreview(
    'label-receiver-element',
    html`
      <h3>Two Shadow Roots — Forwarded label (naive) (DON'T)</h3>
      <label-receiver-element inputid="email" type="email">
        <label-host-element slot="forward-label">
          <label slot="forward-label" for="email">Email</label>
        </label-host-element>
      </label-receiver-element>
    `
  );

export const Shadow_TwoRoots_ForwardedLabel_Synthesized_Do = () =>
  withCodeAndA11yPreview(
    'label-receiver-element',
    html`
      <h3>Two Shadow Roots — Forwarded label (synthesized) (DO)</h3>
      <label-receiver-element inputid="email" type="email" .useSlotAsAccessibleName=${true}>
        <label-host-element slot="forward-label">
          <label slot="forward-label" for="email">Email</label>
        </label-host-element>
      </label-receiver-element>
    `
  );

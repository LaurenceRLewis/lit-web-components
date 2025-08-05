import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('complex-table')
export class ComplexTable extends LitElement {
  static styles = css`
    :host {
      --purple-900: #4338ca;
      --purple-700: #5941a9;
      --purple-500: #7b61c4;
      --purple-300: #a886e5;
      --purple-100: #d3beff;
      --white: #ffffff;
      --black: #262626;
      font-family: Aptos, Bierstadt, "Segoe UI", -apple-system, BlinkMacSystemFont,
        Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      line-height: 1.5;
      display: block;
    }

    .table-wrapper {
      overflow-x: auto;
      display: block;
    }

    table {
      width: 800px;
      table-layout: auto;
      border-collapse: collapse;
    }

    caption {
      padding-bottom: 0.5em;
      color: var(--purple-900);
      font-size: 1.2rem;
      font-weight: 700;
      text-align: left;
    }

    table,
    th,
    td {
      border: 1px solid var(--purple-300);
    }

    th,
    td {
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: var(--purple-700);
      color: var(--white);
    }

    th.sticky-col {
      background-color: var(--purple-700);
      color: var(--white);
    }

    td {
      background-color: var(--white);
      color: var(--black);
    }

    .sticky-header {
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: var(--purple-700);
    }

    tfoot > tr > th {
      background-color: var(--white);
      color: var(--black);
    }

    .sticky-col {
      position: sticky;
      right: 0;
      background-color: var(--white);
      z-index: 2;
      box-shadow: -2px 0 0 rgba(0, 0, 0, 0.1);
    }

    .edit-link {
      display: inline-block;
      margin-left: 0.5rem;
      padding: 0.25rem 0.5rem;
      background-color: var(--purple-100);
      border-radius: 4px;
      text-decoration: none;
      color: var(--purple-900);
      font-size: 0.875rem;
    }

    .edit-link:focus-visible,
    .ellipsis-btn:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--purple-900);
      outline-offset: 2px;
    }

    .ellipsis-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      margin-left: 0.5rem;
    }
  `;

  @property({ type: Boolean }) stickyLastColumn = true;
  @property({ type: String }) fixedWidth: string | null = null;

  @query('.table-wrapper') container!: HTMLElement;

  firstUpdated() {
    this.container.addEventListener('focusin', (event: FocusEvent) => {
      const el = event.target as HTMLElement;
      if (!(el.tagName === 'BUTTON' || el.tagName === 'A')) return;

      const elRect = el.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      const sticky = this.renderRoot.querySelector('.sticky-col') as HTMLElement;
      if (!sticky) return;

      const stickyRect = sticky.getBoundingClientRect();
      const fullyVisible =
        elRect.left >= containerRect.left && elRect.right <= stickyRect.left;

      if (!fullyVisible) {
        el.scrollIntoView({
          block: 'nearest',
          inline: 'start',
          behavior: 'smooth',
        });
      }
    });
  }

  render() {
    const stickyClass = this.stickyLastColumn ? 'sticky-col' : '';
    const wrapperStyle = this.fixedWidth
      ? { width: this.fixedWidth }
      : {};

    return html`
      <h2>Includes, thead, tbody, tfoot</h2>
      <div class="table-wrapper" style=${styleMap(wrapperStyle)}>
        <table>
          <thead>
            <tr>
              <th scope="col" class="sticky-header">Offer</th>
              <th scope="col" class="sticky-header">QTY</th>
              <th scope="col" class="sticky-header">ex GST</th>
              <th scope="col" class="sticky-header ${stickyClass}">inc GST</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="colgroup" colspan="4">Achmee Broadband - Recurring charges</th>
            </tr>
            <tr>
              <td>Accelerator - 10 Sep to 09 Oct <a href="#" class="edit-link">Edit</a></td>
              <td>2</td>
              <td>$18.18</td>
              <td class=${stickyClass}>$20.00</td>
            </tr>
            <tr>
              <td>Epic Plan - 10 Sep to 09 Oct <button class="ellipsis-btn">⋮</button></td>
              <td>1</td>
              <td><a href="#" class="price-link">$45.45</a></td>
              <td class=${stickyClass}>$49.99</td>
            </tr>
            <tr>
              <td>Essential Plan - 10 Sep to 09 Oct <a href="#" class="edit-link">Details</a></td>
              <td>1</td>
              <td>$18.18</td>
              <td class=${stickyClass}>$20.00</td>
            </tr>
            <tr>
              <td><strong>Achmee Broadband total</strong></td>
              <td></td>
              <td><strong>$361.25</strong></td>
              <td class=${stickyClass}><strong>$394.67</strong></td>
            </tr>
            <tr>
              <th colspan="4">Slicing - One-off charges and credits</th>
            </tr>
            <tr>
              <td>Site installation <a href="#" class="edit-link">Update</a></td>
              <td>1</td>
              <td>$12.00</td>
              <td class=${stickyClass}>$13.20</td>
            </tr>
            <tr>
              <td>Site survey <button class="ellipsis-btn">⋮</button></td>
              <td>3</td>
              <td><a href="#" class="price-link">$30.00</a></td>
              <td class=${stickyClass}>$33.00</td>
            </tr>
            <tr>
              <td><strong>Slicing total</strong></td>
              <td></td>
              <td><strong><a href="#" class="price-link">$42.00</a></strong></td>
              <td class=${stickyClass}><strong>$42.00</strong></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3"><strong>New charges total</strong></th>
              <td class=${stickyClass}>
                <strong>$440.87</strong><br />
                inc GST of $37.62
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }
}

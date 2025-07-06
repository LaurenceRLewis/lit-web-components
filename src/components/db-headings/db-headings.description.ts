import { html } from 'lit';

export const HeadingsDescription = html`
  <style>
    ul {
      padding-left: 1.25rem;
    }

    code {
      background: #eee;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
    }
  </style>
  <div>
    <h1>Heading Structure Test</h1>
    <p>
      This component simulates various heading structures to test screen reader
      and automation tool responses.
    </p>
    <ul>
      <li><strong>valid</strong>: Full hierarchy from <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>.</li>
      <li><strong>missingH1</strong>: Skips <code>&lt;h1&gt;</code>, starts at <code>&lt;h2&gt;</code>.</li>
      <li><strong>skippedLevels</strong>: Omits intermediary levels (e.g., h2 → h3 → h5).</li>
      <li><strong>multipleH1</strong>: More than one <code>&lt;h1&gt;</code> on the page.</li>
      <li><strong>notSemantic</strong>: Uses <code>role="heading"</code> with <code>aria-level</code> only.</li>
    </ul>
  </div>
`;

//modular-tab-container.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

@customElement('modular-tab-container')
export class ModularTabContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tab-list {
      display: flex;
      border-bottom: 1px solid #ccc;
    }

    .panel-container {
      padding: 16px 0;
    }
  `;

  @queryAssignedElements({ slot: 'tabs' }) 
  private tabs!: NodeListOf<any>;

  @queryAssignedElements({ slot: 'panels' }) 
  private panels!: NodeListOf<any>;

  private tabLabels = new Map<string, string>();

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tab-selected', this.handleTabSelected as EventListener);
    
    // Listen for slot changes to update labels
    this.addEventListener('slotchange', this.handleSlotChange as EventListener);
  }

  private handleSlotChange = (event: Event) => {
    console.log('Slot changed, updating labels'); // Debug log
    setTimeout(() => {
      this.extractTabLabels();
      this.updatePanelLabels();
    }, 0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tab-selected', this.handleTabSelected as EventListener);
  }

  firstUpdated() {
    // Wait for all components to be fully rendered
    setTimeout(() => {
      console.log('First updated - extracting labels'); // Debug log
      this.extractTabLabels();
      this.updatePanelLabels();
    }, 100); // Longer delay to ensure everything is ready
  }

  updated() {
    // Re-extract labels whenever the component updates
    this.extractTabLabels();
    this.updatePanelLabels();
  }

  private extractTabLabels() {
    // Extract text content from each tab for accessibility
    if (this.tabs) {
      this.tabs.forEach(tab => {
        // Use textContent directly - this gets the slotted content
        const textContent = tab.textContent?.trim() || '';
        
        console.log(`Tab ${tab.id} label: "${textContent}"`); // Debug log
        if (textContent) {
          this.tabLabels.set(tab.id, textContent);
        }
      });
    }
  }

  private updatePanelLabels() {
    // Update panel labels with corresponding tab text
    if (this.panels) {
      this.panels.forEach(panel => {
        const tabId = panel.id.replace('panel-', '');
        const label = this.tabLabels.get(tabId);
        console.log(`Panel ${panel.id} getting label: "${label}" from tab: ${tabId}`); // Debug log
        if (label) {
          panel.label = label;
          panel.requestUpdate(); // Force the panel to re-render with new label
        }
      });
    }
  }

  // Public method to manually update labels if needed
  public updateLabels() {
    console.log('Manual label update triggered');
    this.extractTabLabels();
    this.updatePanelLabels();
  }

  private handleTabSelected = (event: Event) => {
    const customEvent = event as CustomEvent;
    const selectedId = customEvent.detail.id;
    
    // Update tab states
    this.tabs.forEach(tab => {
      tab.selected = tab.id === selectedId;
    });

    // Update panel visibility
    this.panels.forEach(panel => {
      const panelId = `panel-${selectedId}`;
      panel.hidden = panel.id !== panelId;
      panel.tabindex = panel.id === panelId ? 0 : -1;
    });

    // Re-extract labels in case content changed
    this.extractTabLabels();
    this.updatePanelLabels();
  }

  render() {
    return html`
      <div class="tab-list" role="tablist">
        <slot name="tabs"></slot>
      </div>
      <div class="panel-container">
        <slot name="panels"></slot>
      </div>
    `;
  }
}
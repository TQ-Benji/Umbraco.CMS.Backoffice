import { css, html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property, state } from 'lit/decorators.js';
import { UmbContextConsumerMixin } from '../../../core/context';
import { UmbNodeStore } from '../../../core/stores/node.store';
import { Subscription } from 'rxjs';
import { DocumentNode } from '../../../mocks/data/content.data';
import { UmbNotificationService } from '../../../core/service/notifications.store';

@customElement('umb-content-editor')
export class UmbContentEditor extends UmbContextConsumerMixin(LitElement) {
  static styles = [
    UUITextStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      uui-input {
        width: 100%;
        margin-left: 16px;
      }

      uui-tab-group {
        --uui-tab-divider: var(--uui-color-border);
        border-left: 1px solid var(--uui-color-border);
        flex-wrap: nowrap;
        height: 60px;
      }

      uui-tab {
        font-size: 0.8rem;
      }

      uui-box hr {
        margin-bottom: var(--uui-size-6);
      }

      hr {
        border: 0;
        /* TODO: Use correct color property */
        border-top: 1px solid #e7e7e7;
      }
    `,
  ];

  @property()
  id!: string;

  @state()
  _node?: DocumentNode;

  private _nodeStore?: UmbNodeStore;
  private _nodeSubscription?: Subscription;

  private _notificationService?: UmbNotificationService;

  constructor() {
    super();

    this.consumeContext('umbNodeStore', (store: UmbNodeStore) => {
      this._nodeStore = store;
      this._useNode();
    });

    this.consumeContext('umbNotificationService', (service: UmbNotificationService) => {
      this._notificationService = service;
    });
  }

  // FLYT
  private _onPropertyValueChange(e: CustomEvent) {
    const target = e.target as any;

    // TODO: Set value.
    const property = this._node?.properties.find((x) => x.alias === target.property.alias);
    if (property) {
      property.tempValue = target.value;
    } else {
      console.error('property was not found', target.property.alias);
    }
  }

  private _useNode() {
    this._nodeSubscription?.unsubscribe();

    this._nodeSubscription = this._nodeStore?.getById(parseInt(this.id)).subscribe((node) => {
      if (!node) return; // TODO: Handle nicely if there is no node.
      this._node = node;
    });
  }

  private _onSaveAndPublish() {
    this._onSave();
  }

  private _onSave() {
    // TODO: What if store is not present, what if node is not loaded....
    if (this._node) {
      this._nodeStore?.save([this._node]).then(() => {
        this._notificationService?.peek('Document saved');
      });
    }
  }

  private _onSaveAndPreview() {
    this._onSave();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._nodeSubscription?.unsubscribe();
    delete this._node;
  }

  render() {
    return html`
      <umb-editor-layout>
        <uui-input slot="name" .value="${this._node?.name}"></uui-input>
        <uui-tab-group slot="apps">
          <uui-tab label="Content" active></uui-tab>
          <uui-tab label="Info"></uui-tab>
          <uui-tab label="Actions" disabled></uui-tab>
        </uui-tab-group>

        <uui-box slot="content">
          <!-- TODO: Make sure map get data from data object?, parse on property object. -->
          ${this._node?.properties.map(
            (property) => html`
              <umb-node-property
                .property=${property}
                .value=${property.tempValue}
                @property-value-change=${this._onPropertyValueChange}>
              </umb-node-property>
              <hr />
            `
          )}
        </uui-box>

        <div slot="actions">
          <uui-button @click=${this._onSaveAndPreview} label="Save and preview"></uui-button>
          <uui-button @click=${this._onSave} look="secondary" label="Save"></uui-button>
          <uui-button
            @click=${this._onSaveAndPublish}
            look="primary"
            color="positive"
            label="Save and publish"></uui-button>
        </div>
      </umb-editor-layout>
    `;
  }
}

export default UmbContentEditor;

declare global {
  interface HTMLElementTagNameMap {
    'umb-content-editor': UmbContentEditor;
  }
}
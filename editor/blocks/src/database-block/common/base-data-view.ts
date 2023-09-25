import type { EventName, UIEventHandler } from '@notes/block-std';
import type { Disposable, Slot } from '@notes/global/utils';
import { ShadowlessElement, WithDisposable } from '@notes/lit';
import type { Page } from '@notes/store';
import { property } from 'lit/decorators.js';

import type { DataViewSelection } from '../../__internal__/index.js';
import type { UniComponent } from '../../components/uni-component/uni-component.js';
import type { InsertPosition } from '../types.js';
import type { DataViewExpose, DataViewProps } from './data-view.js';
import type { DataViewManager } from './data-view-manager.js';

export abstract class BaseDataView<
    T extends DataViewManager = DataViewManager,
    Selection extends DataViewSelection = DataViewSelection,
>
    extends WithDisposable(ShadowlessElement)
    implements DataViewProps<T, Selection>, DataViewExpose {
    @property({ attribute: false })
    header!: UniComponent<{ viewMethods: DataViewExpose; view: T }>;
    @property({ attribute: false })
    view!: T;

    @property({ attribute: false })
    bindHotkey!: (hotkeys: Record<string, UIEventHandler>) => Disposable;

    @property({ attribute: false })
    handleEvent!: (name: EventName, handler: UIEventHandler) => Disposable;

    @property({ attribute: false })
    modalMode?: boolean;

    @property({ attribute: false })
    setSelection!: (selection?: Selection) => void;

    @property({ attribute: false })
    selectionUpdated!: Slot<Selection | undefined>;

    @property({ attribute: false })
    onDrag?: (evt: MouseEvent, id: string) => () => void;

    @property({ attribute: false })
    getFlag!: Page['awarenessStore']['getFlag'];

    addRow?(position: InsertPosition): void;

    abstract focusFirstCell(): void;
    abstract getSelection(): Selection | undefined;
}
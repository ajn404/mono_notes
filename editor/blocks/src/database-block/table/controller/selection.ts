import { assertExists } from '@notes/global/utils';
import { ShadowlessElement } from '@notes/lit';
import type { ReactiveController } from 'lit';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { Ref } from 'lit/directives/ref.js';
import { createRef, ref } from 'lit/directives/ref.js';

import type {
    CellFocus,
    MultiSelection,
    TableViewSelection,
} from '../../../__internal__/utils/types.js';
import { startDrag } from '../../utils/drag.js';
import type { DatabaseCellContainer } from '../components/cell-container.js';
import type { DataViewTable } from '../table-view.js';

export class TableSelectionController implements ReactiveController {
    __selectionElement = new SelectionElement();
    private get focusSelectionElement() {
        return this.__selectionElement.focusRef.value;
    }
    private get areaSelectionElement() {
        return this.__selectionElement.selectionRef.value;
    }
    constructor(public host: DataViewTable) {
        host.addController(this);
    }

    private _tableViewSelection?: TableViewSelection;

    get tableContainer() {
        const tableContainer = this.host.querySelector(
            '.affine-database-table-container'
        );
        assertExists(tableContainer);
        return tableContainer;
    }

    get viewData() {
        return this.host.view;
    }

    public hostConnected() {
        requestAnimationFrame(() => {
            this.tableContainer.append(this.__selectionElement);
        });
        this.handleDragEvent();
        this.handleSelectionChange();
    }

    private handleSelectionChange() {
        this.host.disposables.add(
            this.host.selectionUpdated.on(tableSelection => {
                if (!this.isValidSelection(tableSelection)) {
                    this.selection = undefined;
                    return;
                }

                const old = this._tableViewSelection;
                requestAnimationFrame(() => {
                    this.scrollToFocus();
                });
                if (old) {
                    const container = this.getCellContainer(
                        old.focus.rowIndex,
                        old.focus.columnIndex
                    );
                    if (container) {
                        const cell = container.cell;
                        if (old.isEditing) {
                            cell?.onExitEditMode();
                            cell?.blurCell();
                            container.isEditing = false;
                        }
                    }
                }

                this.updateSelection(tableSelection);

                if (tableSelection) {
                    const container = this.getCellContainer(
                        tableSelection.focus.rowIndex,
                        tableSelection.focus.columnIndex
                    );
                    if (container) {
                        const cell = container.cell;
                        if (tableSelection.isEditing) {
                            cell?.onEnterEditMode();
                            container.isEditing = true;
                            cell?.focusCell();
                        }
                    }
                }
            })
        );
    }

    private handleDragEvent() {
        let isDragging = false;
        this.host.disposables.add(
            this.host.handleEvent('dragStart', context => {
                isDragging = true;

                const event = context.get('pointerState').raw;
                const target = event.target;
                if (target instanceof Element) {
                    const cell = target.closest('affine-database-cell-container');
                    if (cell) {
                        const selection = this.selection;
                        if (
                            selection &&
                            selection.isEditing &&
                            selection.focus.rowIndex === cell.rowIndex &&
                            selection.focus.columnIndex === cell.columnIndex
                        ) {
                            return false;
                        }
                        this.startDrag(event, cell);
                        event.preventDefault();
                        return true;
                    }
                    return false;
                }
                return false;
            })
        );

        this.host.disposables.add(
            this.host.handleEvent('dragMove', context => {
                if (isDragging) {
                    const event = context.get('pointerState').raw;
                    event.preventDefault();
                }
                return false;
            })
        );

        this.host.disposables.add(
            this.host.handleEvent('dragEnd', () => {
                isDragging = false;
                return false;
            })
        );
    }

    isValidSelection(selection?: TableViewSelection): boolean {
        if (!selection) {
            return true;
        }
        if (selection.focus.rowIndex > this.host.view.rows.length - 1) {
            this.selection = undefined;
            return false;
        }
        if (selection.focus.columnIndex > this.host.view.columns.length - 1) {
            this.selection = undefined;
            return false;
        }
        return true;
    }

    private clearSelection() {
        this.host.setSelection();
    }

    get selection(): TableViewSelection | undefined {
        return this._tableViewSelection;
    }

    set selection(data: Omit<TableViewSelection, 'viewId' | 'type'> | undefined) {
        if (!data) {
            this.clearSelection();
            return;
        }
        const selection: TableViewSelection = {
            ...data,
            viewId: this.host.view.id,
            type: 'table',
        };
        if (selection.isEditing) {
            const focus = selection.focus;
            const container = this.getCellContainer(
                focus.rowIndex,
                focus.columnIndex
            );
            const cell = container?.cell;
            const isEditing = cell ? cell.beforeEnterEditMode() : true;
            this.host.setSelection({
                ...selection,
                isEditing,
            });
        } else {
            this.host.setSelection(selection);
        }
    }

    cellPosition(left: number, top: number) {
        const rows = this.rows();
        const cells = rows
            .item(0)
            .querySelectorAll('affine-database-cell-container');
        const rowOffsets: number[] = Array.from(rows).map(
            v => v.getBoundingClientRect().top - top
        );
        const columnOffsets: number[] = Array.from(cells).map(
            v => v.getBoundingClientRect().left - left
        );
        return (x1: number, x2: number, y1: number, y2: number) => {
            const [startX, endX] = x1 < x2 ? [x1, x2] : [x2, x1];
            const [startY, endY] = y1 < y2 ? [y1, y2] : [y2, y1];
            const row: MultiSelection = {
                start: 0,
                end: 0,
            };
            const column: MultiSelection = {
                start: 0,
                end: 0,
            };
            for (let i = 0; i < rowOffsets.length; i++) {
                const offset = rowOffsets[i];
                if (offset < startY) {
                    row.start = i;
                }
                if (offset < endY) {
                    row.end = i;
                }
            }
            for (let i = 0; i < columnOffsets.length; i++) {
                const offset = columnOffsets[i];
                if (offset < startX) {
                    column.start = i;
                }
                if (offset < endX) {
                    column.end = i;
                }
            }
            return {
                row,
                column,
            };
        };
    }

    startDrag(evt: PointerEvent, cell: DatabaseCellContainer) {
        const table = this.tableContainer;
        const tableRect = table.getBoundingClientRect();
        const startOffsetX = evt.x - tableRect.left;
        const startOffsetY = evt.y - tableRect.top;
        const offsetToSelection = this.cellPosition(tableRect.left, tableRect.top);
        const select = (selection: {
            row: MultiSelection;
            column: MultiSelection;
        }) => {
            this.selection = {
                rowsSelection: selection.row,
                columnsSelection: selection.column,
                focus: {
                    rowIndex: cell.rowIndex,
                    columnIndex: cell.columnIndex,
                },
                isEditing: false,
            };
        };
        startDrag<
            | {
                row: MultiSelection;
                column: MultiSelection;
            }
            | undefined,
            {
                x: number;
                y: number;
            }
        >(evt, {
            transform: evt => ({
                x: evt.x,
                y: evt.y,
            }),
            onDrag: () => undefined,
            onMove: ({ x, y }) => {
                const currentOffsetX = x - tableRect.left;
                const currentOffsetY = y - tableRect.top;
                const selection = offsetToSelection(
                    currentOffsetX,
                    startOffsetX,
                    currentOffsetY,
                    startOffsetY
                );
                select(selection);
                return selection;
            },
            onDrop: selection => {
                if (!selection) {
                    return;
                }
                select(selection);
            },
            onClear: () => {
                //
            },
        });
    }

    focusTo(rowIndex: number, columnIndex: number) {
        if (rowIndex < 0 || rowIndex >= this.host.view.rows.length) {
            return;
        }
        if (
            columnIndex < 0 ||
            columnIndex >= this.host.view.columnManagerList.length
        ) {
            return;
        }
        this.selection = {
            isEditing: false,
            focus: {
                rowIndex,
                columnIndex,
            },
        };
        this.focusSelectionElement?.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
        });
    }

    selectRange(
        selection: TableViewSelection,
        row: MultiSelection,
        column: MultiSelection
    ) {
        this.selection = {
            ...selection,
            rowsSelection: row,
            columnsSelection: column,
            isEditing: false,
        };
    }

    getCellContainer(
        rowIndex: number,
        columnIndex: number
    ): DatabaseCellContainer | undefined {
        const row = this.rows().item(rowIndex);
        return row
            ?.querySelectorAll('affine-database-cell-container')
            .item(columnIndex);
    }

    private rows() {
        return this.tableContainer.querySelectorAll('.affine-database-block-row');
    }

    selectionStyleUpdateTask = 0;

    updateSelection(tableSelection?: TableViewSelection) {
        const update = () => {
            this.updateSelectionStyle(
                tableSelection?.rowsSelection,
                tableSelection?.columnsSelection
            );

            const isRowSelection =
                tableSelection?.rowsSelection && !tableSelection?.columnsSelection;
            this.updateFocusSelectionStyle(
                tableSelection?.focus,
                isRowSelection,
                tableSelection?.isEditing
            );
        };
        if (!tableSelection) {
            cancelAnimationFrame(this.selectionStyleUpdateTask);
            update();
        } else {
            const task = () => {
                update();
                cancelAnimationFrame(this.selectionStyleUpdateTask);
                this.selectionStyleUpdateTask = requestAnimationFrame(task);
            };
            task();
        }
        this._tableViewSelection = tableSelection;
    }

    updateSelectionStyle(
        rowSelection?: MultiSelection,
        columnSelection?: MultiSelection
    ) {
        const div = this.areaSelectionElement;
        if (!div) return;
        if (!rowSelection && !columnSelection) {
            div.style.display = 'none';
            return;
        }
        const tableRect = this.tableContainer.getBoundingClientRect();
        // eslint-disable-next-line prefer-const
        let { left, top, width, height, scale } = this.getRect(
            rowSelection?.start ?? 0,
            rowSelection?.end ?? this.host.view.rows.length - 1,
            columnSelection?.start ?? 0,
            columnSelection?.end ?? this.host.view.columnManagerList.length - 1
        );
        const isRowSelection = rowSelection && !columnSelection;
        if (isRowSelection) {
            left = tableRect.left;
            width = tableRect.width;
        }
        div.style.left = `${left - tableRect.left / scale}px`;
        div.style.top = `${top - tableRect.top / scale}px`;
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.display = 'block';
        div.style.border = isRowSelection
            ? '1px solid var(--affine-primary-color)'
            : 'unset';
    }

    updateFocusSelectionStyle(
        focus?: CellFocus,
        isRowSelection?: boolean,
        isEditing = false
    ) {
        const div = this.focusSelectionElement;
        if (!div) return;
        if (focus && !isRowSelection) {
            // Check if row is removed.
            const rows = this.rows();
            if (rows.length <= focus.rowIndex) return;

            const { left, top, width, height, scale } = this.getRect(
                focus.rowIndex,
                focus.rowIndex,
                focus.columnIndex,
                focus.columnIndex
            );
            const tableRect = this.tableContainer.getBoundingClientRect();
            div.style.left = `${left - tableRect.left / scale}px`;
            div.style.top = `${top - 1 - tableRect.top / scale}px`;
            div.style.width = `${width + 1}px`;
            div.style.height = `${height + 1}px`;
            div.style.borderColor = 'var(--affine-primary-color)';
            div.style.boxShadow = isEditing
                ? '0px 0px 0px 2px rgba(30, 150, 235, 0.30)'
                : 'unset';
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    }

    getRect(top: number, bottom: number, left: number, right: number) {
        const rows = this.rows();
        const topRow = rows.item(top);
        const bottomRow = rows.item(bottom);
        const topCells = topRow.querySelectorAll('affine-database-cell-container');
        const leftCell = topCells.item(left);
        const rightCell = topCells.item(right);
        const leftRect = leftCell.getBoundingClientRect();
        const scale = leftRect.width / leftCell.column.width;
        return {
            top: leftRect.top / scale,
            left: leftRect.left / scale,
            width: (rightCell.getBoundingClientRect().right - leftRect.left) / scale,
            height: (bottomRow.getBoundingClientRect().bottom - leftRect.top) / scale,
            scale,
        };
    }

    public selectRow(index: number) {
        this.selection = {
            rowsSelection: {
                start: index,
                end: index,
            },
            focus: {
                rowIndex: index,
                columnIndex: 0,
            },
            isEditing: false,
        };
    }

    public toggleRow(index: number) {
        const selection = this.selection;
        if (selection) {
            const rowsSelection = selection.rowsSelection;
            if (
                rowsSelection &&
                !selection.columnsSelection &&
                rowsSelection.start === index &&
                rowsSelection.end === index
            ) {
                this.selection = {
                    ...selection,
                    rowsSelection: undefined,
                };
                return;
            }
        }
        this.selection = {
            rowsSelection: {
                start: index,
                end: index,
            },
            focus: {
                rowIndex: index,
                columnIndex: 0,
            },
            isEditing: false,
        };
    }

    focusFirstCell() {
        this.selection = {
            focus: {
                rowIndex: 0,
                columnIndex: 0,
            },
            isEditing: false,
        };
    }

    private scrollToFocus() {
        this.focusSelectionElement?.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
        });
    }

    public insertRowBefore(rowId: string) {
        const id = this.host.view.rowAdd({ before: true, id: rowId });
        this.selection = {
            focus: {
                rowIndex: this.host.view.rows.findIndex(v => v === id),
                columnIndex: this.selection?.focus.columnIndex ?? 0,
            },
            isEditing: false,
        };
    }

    public insertRowAfter(rowId: string) {
        const id = this.host.view.rowAdd({ before: false, id: rowId });
        requestAnimationFrame(() => {
            this.selection = {
                focus: {
                    rowIndex: this.host.view.rows.findIndex(v => v === id),
                    columnIndex: this.selection?.focus.columnIndex ?? 0,
                },
                isEditing: true,
            };
        });
    }

    public deleteRow(rowId: string) {
        const index = this.host.view.rows.findIndex(id => id === rowId);
        this.host.view.rowDelete([rowId]);
        requestAnimationFrame(() => {
            this.selection = {
                focus: {
                    rowIndex: index - 1,
                    columnIndex: this.selection?.focus.columnIndex ?? 0,
                },
                isEditing: true,
            };
        });
    }
}

@customElement('data-view-table-selection')
class SelectionElement extends ShadowlessElement {
    public static override styles = css`
    .database-selection {
      position: absolute;
      z-index: 1;
      box-sizing: border-box;
      background: var(--affine-primary-color-04);
      pointer-events: none;
      display: none;
    }

    .database-focus {
      position: absolute;
      width: 100%;
      z-index: 1;
      box-sizing: border-box;
      border: 1px solid var(--affine-primary-color);
      border-radius: 2px;
      pointer-events: none;
      display: none;
      outline: none;
    }

    @media print {
      affine-database-selection {
        display: none;
      }
    }
  `;

    focusRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>();
    selectionRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>();
    override render() {
        return html`
      <div ${ref(this.selectionRef)} class="database-selection"></div>
      <div tabindex="0" ${ref(this.focusRef)} class="database-focus"></div>
    `;
    }
}
import type { BaseBlockModel } from '@notes/store';

export interface SelectedBlock {
    model: BaseBlockModel;
    startPos?: number;
    endPos?: number;
    children: SelectedBlock[];
}

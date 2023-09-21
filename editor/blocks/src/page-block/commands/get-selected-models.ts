import type { Command } from '@notes/block-std';
import { assertInstanceOf } from '@notes/global/utils';
import { BlockSuiteRoot } from '@notes/lit';
import type { BaseBlockModel } from '@notes/store';

import { getSelectedContentModels } from '../utils/index.js';

export const getSelectedModelsCommand: Command<
    never,
    'selectedModels',
    {
        selectionType?: Extract<
            BlockSuite.SelectionType,
            'block' | 'text' | 'image'
        >[];
    }
> = (ctx, next) => {
    const { root } = ctx.std;
    try {
        assertInstanceOf(root, BlockSuiteRoot);
    } catch {
        return Promise.resolve();
    }
    const selectionType = ctx.selectionType ?? ['block', 'text', 'image'];
    const selectedModels = getSelectedContentModels(root, selectionType);

    return next({ selectedModels });
};

declare global {
    namespace BlockSuite {
        interface CommandData {
            selectedModels?: BaseBlockModel[];
        }

        interface Commands {
            getSelectedModels: typeof getSelectedModelsCommand;
        }
    }
}
